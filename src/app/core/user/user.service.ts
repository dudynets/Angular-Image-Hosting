import {inject, Injectable} from '@angular/core';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {UserData} from '../auth/state/auth.model';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly router: Router = inject(Router);
  private readonly message: NzMessageService = inject(NzMessageService);

  async loadUser(userId: string): Promise<UserData | undefined> {
    try {
      const userDocument = doc(this.firestore, `users/${userId}`);
      const userDocumentSnapshot = await getDoc(userDocument);
      if (!userDocumentSnapshot.exists()) {
        this.message.error('Користувача не знайдено!');
        await this.router.navigate(['/']);
        return;
      }
      return userDocumentSnapshot.data() as UserData;
    } catch (e) {
      this.message.error('Не вдалося завантажити користувача!');
      await this.router.navigate(['/']);
      return;
    }
  }
}
