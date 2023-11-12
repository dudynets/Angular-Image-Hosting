import {User} from '@angular/fire/auth';
import {Timestamp} from '@firebase/firestore';

export interface AuthStateModel {
  user: User | null;
}

export interface UserData {
  userId: string;
  userEmail: string;
  userDisplayName: string | null;
  userPhotoURL: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  likedImages: string[];
}

export const DEFAULT_AUTH_STATE: AuthStateModel = {
  user: null,
};
