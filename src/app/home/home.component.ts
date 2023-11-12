import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {AuthSelectors} from '../core/auth/state/auth.selectors';
import {Observable} from 'rxjs';
import {User} from '@angular/fire/auth';
import {FeedType} from '../shared/components/feed/feed.component';

@Component({
  selector: 'ih-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @Select(AuthSelectors.user)
  user$!: Observable<User>;
  protected readonly FeedType = FeedType;
}
