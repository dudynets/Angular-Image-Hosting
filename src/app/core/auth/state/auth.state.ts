import {inject, Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {AuthStateModel, DEFAULT_AUTH_STATE} from './auth.model';
import {LoginWithGoogle, Logout, UpdateUser} from './auth.actions';
import {AuthService} from '../auth.service';

@State<AuthStateModel>({
  name: 'auth',
  defaults: DEFAULT_AUTH_STATE,
})
@Injectable()
export class AuthState {
  private readonly authService: AuthService = inject(AuthService);

  @Action(UpdateUser)
  updateUser(ctx: StateContext<AuthStateModel>, action: UpdateUser): void {
    ctx.patchState({
      user: action.user,
    });
  }

  @Action(LoginWithGoogle)
  async loginWithGoogle(): Promise<void> {
    return await this.authService.loginWithGoogle();
  }

  @Action(Logout)
  async logout(): Promise<void> {
    return await this.authService.logout();
  }
}
