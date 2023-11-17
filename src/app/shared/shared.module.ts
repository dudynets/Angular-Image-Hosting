import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {UploaderComponent} from './components/uploader/uploader.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzPipesModule} from 'ng-zorro-antd/pipes';
import {ImageEditorModule} from '@syncfusion/ej2-angular-image-editor';
import {FeedComponent} from './components/feed/feed.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UploaderComponent,
    FeedComponent,
  ],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzSpaceModule,
    RouterLink,
    NzButtonModule,
    RouterLinkActive,
    NzAvatarModule,
    NzPopoverModule,
    NzIconModule,
    NzUploadModule,
    NzDividerModule,
    NzLayoutModule,
    NzPipesModule,
    ImageEditorModule,
    NzFormModule,
    NzCardModule,
    NzSpinModule,
    NzEmptyModule,
    NzImageModule,
    NzTagModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent, UploaderComponent, FeedComponent],
})
export class SharedModule {}
