import {NzUploadFile} from 'ng-zorro-antd/upload';

export function fileToBlob(file: NzUploadFile): Blob {
  // @ts-ignore
  return file as Blob;
}
