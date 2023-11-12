import {inject, Injectable} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Timestamp} from '@firebase/firestore';
import {ILike} from './like.model';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private readonly auth: Auth = inject(Auth);
  private readonly firestore: Firestore = inject(Firestore);
  private readonly message: NzMessageService = inject(NzMessageService);

  async likeImage(imageId: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        this.message.error('Будь ласка, авторизуйтесь!');
        return;
      }
      const likeData: ILike = {
        likeId: `${user.uid}_${imageId}`,
        likeAuthorId: user.uid,
        likeImageId: imageId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      const likeDocument = doc(
        collection(this.firestore, 'likes'),
        likeData.likeId,
      );
      await setDoc(likeDocument, likeData);
    } catch (error) {
      this.message.error('Помилка створення вподобання!');
    }
  }

  async unlikeImage(imageId: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        this.message.error('Будь ласка, авторизуйтесь!');
        return;
      }
      const likesCollection = collection(this.firestore, 'likes');
      const likesQuery = query(
        likesCollection,
        where('likeAuthorId', '==', user.uid),
        where('likeImageId', '==', imageId),
      );
      const likesSnapshot = await getDocs(likesQuery);
      const likeDocument = likesSnapshot.docs[0];
      await deleteDoc(doc(this.firestore, 'likes', likeDocument.id));
    } catch (error) {
      this.message.error('Помилка видалення вподобання!');
    }
  }

  async getLikesCountByImageId(imageId: string): Promise<{
    liked: boolean;
    likesCount: number;
  }> {
    const likesCollection = collection(this.firestore, 'likes');
    const likesQuery = query(
      likesCollection,
      where('likeImageId', '==', imageId),
    );
    const likesSnapshot = await getDocs(likesQuery);
    return {
      liked: likesSnapshot.docs.some(
        (likeDocument) =>
          likeDocument.data()['likeAuthorId'] === this.auth.currentUser?.uid,
      ),
      likesCount: likesSnapshot.size,
    };
  }

  async getLikedImages(): Promise<string[] | undefined> {
    if (!this.auth.currentUser) return;

    const likesCollection = collection(this.firestore, 'likes');
    const likesQuery = query(
      likesCollection,
      where('likeAuthorId', '==', this.auth.currentUser?.uid),
    );
    const likesSnapshot = await getDocs(likesQuery);
    return likesSnapshot.docs.map((likeDocument) => {
      return likeDocument.data()['likeImageId'];
    });
  }
}
