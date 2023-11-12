import {User} from '@angular/fire/auth';

export class LoginWithGoogle {
  static readonly type = '[Auth] Login With Google';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class UpdateUser {
  static readonly type = '[Auth] Update User';

  constructor(public readonly user: User | null) {}
}
