import {inject, Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import {IImage} from '../image/image.model';
import {LikeService} from '../like/like.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly message: NzMessageService = inject(NzMessageService);
  private readonly likeService: LikeService = inject(LikeService);
  private readonly router: Router = inject(Router);

  async loadAllImages(): Promise<IImage[] | undefined> {
    try {
      const imagesCollection = collection(this.firestore, 'images');
      const imagesQuery = query(imagesCollection, orderBy('createdAt', 'desc'));
      const imagesSnapshot = await getDocs(imagesQuery);

      return imagesSnapshot.docs.map((imageDocument) => {
        return imageDocument.data() as IImage;
      });
    } catch (error) {
      this.message.error('Помилка завантаження зображень!');
      return;
    }
  }

  async loadLikedImages(): Promise<IImage[] | undefined> {
    try {
      const likedImagesIds = await this.likeService.getLikedImages();
      if (!likedImagesIds) {
        this.message.error('Увійдіть, щоб переглянути вподобані зображення!');
        await this.router.navigate(['/']);
        return;
      }

      const imagesCollection = collection(this.firestore, 'images');
      const imagesQuery = query(
        imagesCollection,
        orderBy('createdAt', 'desc'),
        where('imageId', 'in', likedImagesIds),
      );
      const imagesSnapshot = await getDocs(imagesQuery);

      return imagesSnapshot.docs.map((imageDocument) => {
        return imageDocument.data() as IImage;
      });
    } catch (error) {
      this.message.error('Помилка завантаження зображень!');
      await this.router.navigate(['/']);
      return;
    }
  }

  async loadUserImages(userId: string): Promise<IImage[] | undefined> {
    try {
      const imagesCollection = collection(this.firestore, 'images');
      const imagesQuery = query(
        imagesCollection,
        orderBy('createdAt', 'desc'),
        where('imageAuthorId', '==', userId),
      );
      const imagesSnapshot = await getDocs(imagesQuery);

      return imagesSnapshot.docs.map((imageDocument) => {
        return imageDocument.data() as IImage;
      });
    } catch (error) {
      this.message.error('Помилка завантаження зображень!');
      await this.router.navigate(['/']);
      return;
    }
  }
}
