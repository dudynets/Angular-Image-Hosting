import {firebase, syncfusionLicense} from '../../config';

export const environment = {
  production: false,
  firebase,
  syncfusionLicense,
  supportedFileTypes: ['image/jpeg', 'image/png'],
  fileSizeLimit: 10240, // 10 MB
};
