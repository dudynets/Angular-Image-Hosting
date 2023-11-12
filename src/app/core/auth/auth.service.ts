import {inject, Injectable} from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Store} from '@ngxs/store';
import {UpdateUser} from './state/auth.actions';
import {doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {UserData} from './state/auth.model';
import {Timestamp} from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  private readonly firestore: Firestore = inject(Firestore);
  private readonly message: NzMessageService = inject(NzMessageService);
  private readonly store: Store = inject(Store);

  initialize(): void {
    this.auth.onAuthStateChanged((user: User | null): void => {
      if (user) {
        this.store.dispatch(new UpdateUser(user));
        return;
      }
      this.store.dispatch(new UpdateUser(null));
    });
  }

  async loginWithGoogle(): Promise<void> {
    const loadingMessageId = this.message.loading('Вхід...', {
      nzDuration: 0,
    }).messageId;

    const provider = new GoogleAuthProvider();

    try {
      const credential = await signInWithPopup(this.auth, provider);
      this.store.dispatch(new UpdateUser(credential.user));

      await this.initUser();

      this.message.remove(loadingMessageId);
      this.message.success('Вхід успішний!');
    } catch (e) {
      this.store.dispatch(new UpdateUser(null));

      this.message.remove(loadingMessageId);
      this.message.error('Вхід не вдався!');
      console.error(e);
    }
  }

  async logout(): Promise<void> {
    const loadingMessageId = this.message.loading('Вихід...', {
      nzDuration: 0,
    }).messageId;

    await this.auth.signOut();

    this.message.remove(loadingMessageId);
    this.message.success('Вихід успішний!');
  }

  async initUser(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;
    const userDocument = doc(this.firestore, `users/${user.uid}`);
    const userDocumentSnapshot = await getDoc(userDocument);
    if (userDocumentSnapshot.exists()) return;
    await setDoc(userDocument, {
      userId: user.uid,
      userEmail: user.email,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    } as UserData);
  }
}
