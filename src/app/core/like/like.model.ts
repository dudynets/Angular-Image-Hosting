import {Timestamp} from '@firebase/firestore';

export interface ILike {
  likeId: string;
  likeAuthorId: string;
  likeImageId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
