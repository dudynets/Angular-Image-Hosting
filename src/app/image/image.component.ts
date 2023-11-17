import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  CATEGORY_LABELS,
  IImage,
  ImageCategory,
  UNCATEGORIZED_COLOR,
  UNCATEGORIZED_LABEL,
} from '../core/image/image.model';
import {ImageService} from '../core/image/image.service';
import {Auth, User} from '@angular/fire/auth';
import {FormControl, Validators} from '@angular/forms';
import {debounceTime, Observable} from 'rxjs';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Clipboard} from '@angular/cdk/clipboard';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommentsService} from '../core/comments/comments.service';
import {IComment} from '../core/comments/comments.model';
import {Timestamp} from '@firebase/firestore';
import {formatDistanceToNow} from 'date-fns';
import {uk} from 'date-fns/locale';
import {Select} from '@ngxs/store';
import {AuthSelectors} from '../core/auth/state/auth.selectors';
import {LikeService} from '../core/like/like.service';

@Component({
  selector: 'ih-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit {
  @Input()
  imageId!: string;

  @Select(AuthSelectors.user)
  user$!: Observable<User | null>;

  image: IImage | undefined;
  _comments: IComment[] = [];
  likesCount = 0;

  titleFormControl = new FormControl<string | undefined>(undefined);
  categoryFormControl = new FormControl<ImageCategory>(
    ImageCategory.Uncategorized,
  );
  commentFormControl = new FormControl<string | undefined>(undefined, [
    Validators.required,
  ]);

  likeLoading = false;
  commentLoading = false;

  isImageLiked = false;

  private readonly imageService: ImageService = inject(ImageService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly auth: Auth = inject(Auth);
  private readonly modalService: NzModalService = inject(NzModalService);
  private readonly clipboardService: Clipboard = inject(Clipboard);
  private readonly messageService: NzMessageService = inject(NzMessageService);
  private readonly commentsService: CommentsService = inject(CommentsService);
  private readonly likeService: LikeService = inject(LikeService);

  protected readonly CATEGORY_LABELS = CATEGORY_LABELS;

  get comments(): IComment[] {
    return this._comments.sort((a, b) => {
      return b.createdAt.seconds - a.createdAt.seconds;
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadImage();

    this.titleFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async (imageTitle) => {
        await this.imageService.updateImageTitle(
          this.imageId,
          imageTitle || '',
        );
      });

    this.categoryFormControl.valueChanges.subscribe(async (imageCategory) => {
      await this.imageService.updateImageCategory(
        this.imageId,
        imageCategory || ImageCategory.Uncategorized,
      );
    });
  }

  async loadImage(): Promise<void> {
    const [image, comments, likes] = await Promise.all([
      this.imageService.getImageById(this.imageId),
      this.commentsService.getCommentsByImageId(this.imageId),
      this.likeService.getLikesCountByImageId(this.imageId),
    ]);
    if (!image) return;

    const imageElement = new Image();
    imageElement.src = image?.imagePublicURL ?? '';
    imageElement.onload = (): void => {
      this.image = image;
      this._comments = comments;
      this.likesCount = likes.likesCount;
      this.isImageLiked = likes.liked;
      this.titleFormControl.setValue(image.imageTitle, {emitEvent: false});
      this.categoryFormControl.setValue(
        image.imageCategory || ImageCategory.Uncategorized,
        {
          emitEvent: false,
        },
      );
      this.cdr.detectChanges();
    };
  }

  get isImageAuthor(): boolean {
    return this.image?.imageAuthorId === this.auth.currentUser?.uid;
  }

  copyLink(): void {
    const url = window.location.href;
    const copyResult = this.clipboardService.copy(url ?? '');
    if (copyResult) {
      this.messageService.success('Посилання успішно скопійовано!');
    } else {
      this.messageService.error('Помилка копіювання посилання!');
    }
  }

  openImageFile(): void {
    window.open(this.image?.imagePublicURL ?? '');
  }

  deleteImage(): void {
    this.modalService.confirm({
      nzTitle: 'Ви впевнені, що хочете видалити це зображення?',
      nzOkText: 'Так, видалити',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzClosable: false,
      nzOnOk: () => this.imageService.deleteImage(this.imageId),
      nzCancelText: 'Ні, відмінити',
    });
  }

  formatTimestamp(createdAt: Timestamp): string {
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, {addSuffix: true, locale: uk});
  }

  async submitComment(): Promise<void> {
    if (!this.commentFormControl.value || this.commentLoading) return;
    this.commentLoading = true;
    const comment = await this.commentsService.createComment(
      this.commentFormControl.value,
      this.imageId,
    );
    this.commentFormControl.reset(undefined, {emitEvent: false});
    this.commentLoading = false;
    if (comment) this._comments.push(comment);
    this.cdr.detectChanges();
  }

  isCommentAuthor(comment: IComment): boolean {
    return comment.commentAuthorId === this.auth.currentUser?.uid;
  }

  deleteComment(comment: IComment) {
    this.modalService.confirm({
      nzTitle: 'Ви впевнені, що хочете видалити цей коментар?',
      nzOkText: 'Так, видалити',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzClosable: false,
      nzOnOk: async () => {
        await this.commentsService.deleteComment(comment.commentId);
        this._comments = this._comments.filter(
          (c) => c.commentId !== comment.commentId,
        );
        this.cdr.detectChanges();
      },
      nzCancelText: 'Ні, відмінити',
    });
  }

  async toggleLike(): Promise<void> {
    if (this.likeLoading) return;
    this.likeLoading = true;
    if (this.isImageLiked) {
      await this.likeService.unlikeImage(this.imageId);
      this.likesCount--;
      this.isImageLiked = false;
    } else {
      await this.likeService.likeImage(this.imageId);
      this.likesCount++;
      this.isImageLiked = true;
    }
    this.likeLoading = false;
    this.cdr.detectChanges();
  }

  getCategoryColor(imageCategory: ImageCategory): string {
    return (
      CATEGORY_LABELS.find((category) => category.value === imageCategory)
        ?.color || UNCATEGORIZED_COLOR
    );
  }

  getCategoryLabel(imageCategory: ImageCategory): string {
    return (
      CATEGORY_LABELS.find((category) => category.value === imageCategory)
        ?.label || UNCATEGORIZED_LABEL
    );
  }
}
