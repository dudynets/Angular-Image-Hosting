import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FeedType} from 'src/app/shared/components/feed/feed.component';

@Component({
  selector: 'ih-liked',
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikedComponent {
  protected readonly FeedType = FeedType;
}
