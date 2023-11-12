import {inject, Injectable} from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {IImage} from './image.model';
import {deleteObject, ref, Storage} from '@angular/fire/storage';
import {Auth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly storage: Storage = inject(Storage);
  private readonly message: NzMessageService = inject(NzMessageService);
  private readonly router: Router = inject(Router);
  private readonly auth: Auth = inject(Auth);

  async getImageById(imageId: string): Promise<IImage | undefined> {
    try {
      const imagesCollection = collection(this.firestore, 'images');
      const imageDocument = doc(imagesCollection, imageId);
      const imageDocumentSnapshot = await getDoc(imageDocument);
      const imageDocumentData = imageDocumentSnapshot.data() as IImage;
      if (!imageDocumentData) {
        this.message.error('Зображення не знайдено!');
        await this.router.navigate(['/']);
        return;
      }
      return imageDocumentData;
    } catch (error) {
      this.message.error('Помилка завантаження зображення!');
      await this.router.navigate(['/']);
      return;
    }
  }

  async updateImageTitle(imageId: string, imageTitle: string): Promise<void> {
    try {
      const imagesCollection = collection(this.firestore, 'images');
      const imageDocument = doc(imagesCollection, imageId);
      await updateDoc(imageDocument, {imageTitle});
      this.message.remove();
      this.message.success('Назва зображення успішно оновлена!');
    } catch (error) {
      this.message.remove();
      this.message.error('Помилка оновлення назви зображення!');
    }
  }

  async deleteImage(imageId: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        this.message.error('Помилка видалення зображення!');
        return;
      }
      const imagesCollection = collection(this.firestore, 'images');
      const imageDocument = doc(imagesCollection, imageId);
      await deleteDoc(imageDocument);
      const storageRef = ref(this.storage, `images/${user.uid}/${imageId}`);
      await deleteObject(storageRef);
      this.message.success('Зображення успішно видалено!');
      await this.router.navigate(['/']);
    } catch (error) {
      this.message.error('Помилка видалення зображення!');
    }
  }
}
