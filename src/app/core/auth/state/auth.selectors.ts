import {AuthStateModel} from './auth.model';
import {Selector} from '@ngxs/store';
import {AuthState} from './auth.state';
import {User} from '@angular/fire/auth';

export class AuthSelectors {
  @Selector([AuthState])
  static user(state: AuthStateModel): User | null {
    return state.user;
  }
}
