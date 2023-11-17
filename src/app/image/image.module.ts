import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageRoutingModule} from './image-routing.module';
import {ImageComponent} from './image.component';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTagModule} from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [ImageComponent],
  imports: [
    CommonModule,
    ImageRoutingModule,
    NzSpaceModule,
    NzSpinModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzModalModule,
    NzListModule,
    NzCommentModule,
    NzAvatarModule,
    NzInputModule,
    NzToolTipModule,
    NzEmptyModule,
    NzDividerModule,
    NzCardModule,
    NzImageModule,
    NzSelectModule,
    FormsModule,
    NzTagModule,
  ],
})
export class ImageModule {}
