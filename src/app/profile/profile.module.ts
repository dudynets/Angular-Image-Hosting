import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {SharedModule} from '../shared/shared.module';
import {LikedComponent} from './liked/liked.component';

@NgModule({
  declarations: [LikedComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzDividerModule,
    NzSpaceModule,
    SharedModule,
  ],
})
export class ProfileModule {}
