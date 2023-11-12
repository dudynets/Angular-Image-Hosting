import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {User} from '@angular/fire/auth';
import {AuthSelectors} from '../../../core/auth/state/auth.selectors';
import {LoginWithGoogle, Logout} from '../../../core/auth/state/auth.actions';

@Component({
  selector: 'ih-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Select(AuthSelectors.user)
  user$!: Observable<User | null>;

  private readonly store: Store = inject(Store);

  loginWithGoogle(): void {
    this.store.dispatch(new LoginWithGoogle());
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
