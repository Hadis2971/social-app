class CorpableImageUtils {
  base64StringtoFile (base64String, filename) {
    let arr = base64String.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]); let n = bstr.length; let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  extractImageFileExtensionFromBase64 (base64Data) {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
  }

  image64toCanvasRef (canvasRef, image64, pixelCrop) {
    const canvas = canvasRef; // document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = image64;
    image.onload = function () {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
    };
  }
}

export default new CorpableImageUtils();
