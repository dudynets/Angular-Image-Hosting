import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {SharedModule} from '../shared/shared.module';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzSpaceModule,
    SharedModule,
    NzSkeletonModule,
    NzSpinModule,
    NzAvatarModule,
    NzDividerModule,
    NzIconModule,
  ],
})
export class UserModule {}
