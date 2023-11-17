import {Timestamp} from '@firebase/firestore';

export interface IImage {
  imageId: string;
  imageTitle: string;
  imageAuthorId: string;
  imageAuthorName: string;
  imageAuthorAvatar: string;
  imagePublicURL: string;
  imageCategory: ImageCategory;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export enum ImageCategory {
  Portrait = 'portrait',
  Landscape = 'landscape',
  Commercial = 'commercial',
  Lifestyle = 'lifestyle',
  Documentary = 'documentary',
  StillLife = 'still-life',
  Event = 'event',
  Uncategorized = 'uncategorized',
}

export enum AllCategory {
  All = 'all',
}

export type AllCategories = ImageCategory | AllCategory;

export const UNCATEGORIZED_LABEL = 'Інше';
export const UNCATEGORIZED_COLOR = 'cyan';

export const CATEGORY_LABELS = [
  {
    value: ImageCategory.Portrait,
    label: 'Портрет',
    color: 'magenta',
  },
  {
    value: ImageCategory.Landscape,
    label: 'Пейзаж',
    color: 'red',
  },
  {
    value: ImageCategory.Commercial,
    label: 'Комерційна',
    color: 'volcano',
  },
  {
    value: ImageCategory.Lifestyle,
    label: 'Лайфстайл',
    color: 'orange',
  },
  {
    value: ImageCategory.Documentary,
    label: 'Документальна',
    color: 'gold',
  },
  {
    value: ImageCategory.StillLife,
    label: 'Натюрморт',
    color: 'lime',
  },
  {
    value: ImageCategory.Event,
    label: 'Подія',
    color: 'green',
  },
  {
    value: ImageCategory.Uncategorized,
    label: UNCATEGORIZED_LABEL,
    color: UNCATEGORIZED_COLOR,
  },
];
