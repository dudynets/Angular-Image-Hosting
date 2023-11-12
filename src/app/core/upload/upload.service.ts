import {inject, Injectable} from '@angular/core';
import {collection, doc, Firestore, setDoc} from '@angular/fire/firestore';
import {Auth} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import {v4 as uuidv4} from 'uuid';
import {imageDataToBase64} from '../../shared/helpers/image-data-to-base64';
import {NzMessageService} from 'ng-zorro-antd/message';
import {IImage} from '../image/image.model';
import {Timestamp} from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly auth: Auth = inject(Auth);
  private readonly firestore: Firestore = inject(Firestore);
  private readonly storage: Storage = inject(Storage);
  private readonly message: NzMessageService = inject(NzMessageService);

  async uploadImage(imageData: ImageData): Promise<string | undefined> {
    const loadingMessageId = this.message.loading(
      'Зображення відвантажується...',
      {
        nzDuration: 0,
      },
    ).messageId;

    try {
      const user = this.auth.currentUser;
      if (!user) {
        this.message.remove(loadingMessageId);
        this.message.error('Будь ласка, авторизуйтесь!');
        return;
      }

      const imageBase64 = imageDataToBase64(imageData);
      const imageUUID = uuidv4();

      const storageRef = ref(this.storage, `images/${user.uid}/${imageUUID}`);
      await uploadString(storageRef, imageBase64, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);

      const imageMetadata: IImage = {
        imageId: imageUUID,
        imageTitle: '',
        imageAuthorId: user.uid,
        imageAuthorName: user.displayName || '',
        imageAuthorAvatar: user.photoURL || '',
        imagePublicURL: downloadUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      const imageDbRef = doc(collection(this.firestore, `images`), imageUUID);
      await setDoc(imageDbRef, imageMetadata);

      this.message.remove(loadingMessageId);
      this.message.success('Зображення відвантажено!');

      return imageUUID;
    } catch (error) {
      this.message.remove(loadingMessageId);
      this.message.error('Зображення не вдалося відвантажити!');
      return;
    }
  }
}
