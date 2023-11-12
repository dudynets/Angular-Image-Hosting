import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {FeedType} from '../shared/components/feed/feed.component';
import {UserService} from '../core/user/user.service';
import {UserData} from '../core/auth/state/auth.model';

@Component({
  selector: 'ih-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  @Input()
  userId!: string;

  user: UserData | null = null;
  loading = false;

  protected readonly FeedType = FeedType;

  private readonly userService: UserService = inject(UserService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  async ngOnInit(): Promise<void> {
    await this.loadUser();
  }

  async loadUser(): Promise<void> {
    this.loading = true;
    const user = await this.userService.loadUser(this.userId);
    if (!user) return;
    this.user = user;
    this.loading = false;
    this.cdr.detectChanges();
  }
}
