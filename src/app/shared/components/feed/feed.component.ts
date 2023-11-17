import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  AllCategories,
  AllCategory,
  CATEGORY_LABELS,
  IImage,
  ImageCategory,
  UNCATEGORIZED_COLOR,
  UNCATEGORIZED_LABEL,
} from '../../../core/image/image.model';
import {FeedService} from '../../../core/feed/feed.service';
import {FormControl} from '@angular/forms';

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

  filteredImages: IImage[] = [];

  searchFormControl = new FormControl<string | undefined>(undefined);
  categoryFormControl = new FormControl<AllCategories>(AllCategory.All);

  private readonly feedService: FeedService = inject(FeedService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected readonly CATEGORY_LABELS = CATEGORY_LABELS;

  async ngOnInit(): Promise<void> {
    await this.loadImages();

    this.initFilterListeners();
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
    this.filteredImages = images;
    this.loading = false;
    this.cdr.detectChanges();
  }

  initFilterListeners(): void {
    this.searchFormControl.valueChanges.subscribe((searchValue) => {
      this.filterImages(
        searchValue || undefined,
        this.categoryFormControl.value || AllCategory.All,
      );
    });

    this.categoryFormControl.valueChanges.subscribe((categoryValue) => {
      this.filterImages(
        this.searchFormControl.value || undefined,
        categoryValue || AllCategory.All,
      );
    });
  }

  filterImages(
    searchValue: string | undefined,
    categoryValue: AllCategories,
  ): void {
    this.filteredImages = this.images.filter((image) => {
      const searchMatch =
        !searchValue ||
        (image.imageTitle.toLowerCase() || 'без назви').includes(
          searchValue.toLowerCase(),
        );
      const categoryMatch =
        categoryValue === AllCategory.All ||
        image.imageCategory === categoryValue;

      return searchMatch && categoryMatch;
    });
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
