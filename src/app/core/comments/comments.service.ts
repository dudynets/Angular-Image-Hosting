import {inject, Injectable} from '@angular/core';
import {IComment} from './comments.model';
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
import {Auth} from '@angular/fire/auth';
import {v4 as uuidv4} from 'uuid';
import {Timestamp} from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly message: NzMessageService = inject(NzMessageService);
  private readonly auth: Auth = inject(Auth);

  async getCommentsByImageId(imageId: string): Promise<IComment[]> {
    const commentsCollection = collection(this.firestore, 'comments');
    const commentsQuery = query(
      commentsCollection,
      where('commentImageId', '==', imageId),
    );
    const commentsSnapshot = await getDocs(commentsQuery);

    return commentsSnapshot.docs.map((commentDocument) => {
      return commentDocument.data() as IComment;
    });
  }

  async createComment(
    commentText: string,
    imageId: string,
  ): Promise<IComment | undefined> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        this.message.error('Будь ласка, авторизуйтесь!');
        return;
      }
      const commentData: IComment = {
        commentId: uuidv4(),
        commentText: commentText.trim(),
        commentAuthorId: user.uid,
        commentAuthorName: user.displayName || '',
        commentAuthorAvatar: user.photoURL || '',
        commentImageId: imageId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      const commentDocument = doc(
        collection(this.firestore, 'comments'),
        commentData.commentId,
      );
      await setDoc(commentDocument, commentData);
      this.message.success('Коментар успішно створено!');
      return commentData;
    } catch (error) {
      this.message.error('Помилка створення коментаря!');
      return;
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      const commentDocument = doc(this.firestore, 'comments', commentId);
      await deleteDoc(commentDocument);
      this.message.success('Коментар успішно видалено!');
    } catch (error) {
      this.message.error('Помилка видалення коментаря!');
    }
  }
}
