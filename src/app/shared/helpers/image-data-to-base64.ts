export function imageDataToBase64(imageData: ImageData): string {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not create canvas context');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
