import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {IImage} from '../../../core/image/image.model';
import {FeedService} from '../../../core/feed/feed.service';

export enum FeedType {
  All = 'all',
  Liked = 'liked',
  User = 'user',
}

@Component({
  selector: 'ih-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  @Input()
  feedType: FeedType = FeedType.All;

  @Input()
  userId: string | undefined;

  loading = false;

  images: IImage[] = [];

  private readonly feedService: FeedService = inject(FeedService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  async ngOnInit(): Promise<void> {
    await this.loadImages();
  }

  async loadImages(): Promise<void> {
    if (this.feedType === FeedType.User && !this.userId) {
      throw new Error('User id is required for feed type "my"');
    }

    if (this.loading) return;
    this.loading = true;

    let images: IImage[] | undefined;

    switch (this.feedType) {
      case FeedType.All:
        images = await this.feedService.loadAllImages();
        break;
      case FeedType.Liked:
        images = await this.feedService.loadLikedImages();
        break;
      case FeedType.User:
        images = await this.feedService.loadUserImages(this.userId!);
        break;
    }

    if (!images) return;
    this.images = images;
    this.loading = false;
    this.cdr.detectChanges();
  }
}
