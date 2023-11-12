import {Timestamp} from '@firebase/firestore';

export interface IImage {
  imageId: string;
  imageTitle: string;
  imageAuthorId: string;
  imageAuthorName: string;
  imageAuthorAvatar: string;
  imagePublicURL: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
