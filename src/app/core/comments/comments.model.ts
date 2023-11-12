import {Timestamp} from '@firebase/firestore';

export interface IComment {
  commentId: string;
  commentText: string;
  commentAuthorId: string;
  commentAuthorName: string;
  commentAuthorAvatar: string;
  commentImageId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
