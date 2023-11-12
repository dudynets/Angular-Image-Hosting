import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {fileToBlob} from '../../helpers/file-to-blob';
import {Select} from '@ngxs/store';
import {User} from '@angular/fire/auth';
import {AuthSelectors} from '../../../core/auth/state/auth.selectors';
import {ImageEditorComponent} from '@syncfusion/ej2-angular-image-editor';
import {blobToBase64} from '../../helpers/blob-to-base64';
import {UploadService} from '../../../core/upload/upload.service';
import {Router} from '@angular/router';
import {L10n, setCulture} from '@syncfusion/ej2-base';

setCulture('uk-UA');

L10n.load({
  'uk-UA': {
    'image-editor': {
      'Browse': 'Огляд',
      'Crop': 'Обрізати',
      'ZoomIn': 'Збільшити',
      'ZoomOut': 'Зменшити',
      'Transform': 'Трансформувати',
      'Annotation': 'Анотація',
      'Text': 'Текст',
      'Pen': 'Ручка',
      'Reset': 'Скинути',
      'Save': 'Зберегти',
      'Select': 'Вибрати',
      'RotateLeft': 'Повернути ліворуч',
      'RotateRight': 'Повернути праворуч',
      'HorizontalFlip': 'Відобразити по горизонталі',
      'VerticalFlip': 'Відобразити по вертикалі',
      'OK': 'Ок',
      'Cancel': 'Скасувати',
      'FillColor': 'Колір заливки',
      'StrokeColor': 'Колір контуру',
      'StrokeWidth': 'Ширина контуру',
      'FontFamily': 'Шрифт',
      'FontStyle': 'Стиль шрифту',
      'FontSize': 'Розмір шрифту',
      'FontColor': 'Колір шрифту',
      'Pan': 'Панорама',
      'Move': 'Перемістити',
      'Custom': 'Користувацький',
      'Square': 'Квадрат',
      'Circle': 'Круг',
      'Rectangle': 'Прямокутник',
      'Line': 'Лінія',
      'Default': 'Стандартний',
      'Bold': 'Жирний',
      'Italic': 'Курсив',
      'BoldItalic': 'Жирний курсив',
      'Image': 'Зображення',
      'Brightness': 'Яскравість',
      'Contrast': 'Контраст',
      'Hue': 'Відтінок',
      'Saturation': 'Насиченість',
      'Exposure': 'Експозиція',
      'Opacity': 'Прозорість',
      'Blur': 'Розмиття',
      'Chrome': 'Хром',
      'Cold': 'Холодний',
      'Warm': 'Теплий',
      'Grayscale': 'Відтінки сірого',
      'Sepia': 'Сепія',
      'Invert': 'Інвертувати',
      'Color': 'Колір',
      'GradientColor': 'Градієнт',
      'Size': 'Розмір',
      'Inset': 'Внутр. відступ',
      'Offset': 'Зовн. відступ',
      'Radius': 'Радіус',
      'Amount': 'Кількість',
      'Border': 'Контур',
      'Solid': 'Суцільний',
      'Dashed': 'Пунктирний',
      'Dotted': 'Точковий',
      'Ellipse': 'Еліпс',
      'Arrow': 'Стрілка',
      'Path': 'Шлях',
      'XSmall': 'Дуже маленький',
      'Small': 'Маленький',
      'Medium': 'Середній',
      'Large': 'Великий',
      'XLarge': 'Дуже великий',
      'None': 'Немає',
      'Bar': 'Лінія',
      'ArrowSolid': 'Суцільна стрілка',
      'CircleSolid': 'Коло',
      'SquareSolid': 'Суцільний квадрат',
    },
  },
});

@Component({
  selector: 'ih-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderComponent {
  @Select(AuthSelectors.user)
  user$!: Observable<User | null>;

  @ViewChild('imageEditor')
  imageEditor!: ImageEditorComponent;

  pendingUploadFile: Blob | null = null;
  editorFileOpened = false;

  private readonly uploadService: UploadService = inject(UploadService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly router: Router = inject(Router);

  get fileSizeLimit(): number {
    return environment.fileSizeLimit;
  }

  get supportedFileTypes(): string {
    return environment.supportedFileTypes.join(', ');
  }

  get supportedFileTypesString(): string {
    const supportedFileTypes = environment.supportedFileTypes.map(
      (fileType) => {
        return `.${fileType.split('/')[1]}`;
      },
    );
    return supportedFileTypes.join(', ');
  }

  handleUpload(file: NzUploadFile): boolean {
    this.pendingUploadFile = fileToBlob(file);
    return false;
  }

  discardUpload(): void {
    this.pendingUploadFile = null;
    this.editorFileOpened = false;
  }

  async handleImageEditorInit(): Promise<void> {
    const base64 = await blobToBase64(this.pendingUploadFile!);
    this.imageEditor?.open(base64);
  }

  async publish(): Promise<void> {
    const imageData = this.imageEditor.getImageData();
    const imageId = await this.uploadService.uploadImage(imageData);

    if (!imageId) return;

    this.pendingUploadFile = null;
    this.editorFileOpened = false;
    this.cdr.detectChanges();

    await this.router.navigate(['image', imageId]);
  }
}
