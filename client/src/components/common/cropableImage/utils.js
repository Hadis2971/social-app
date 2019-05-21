import uniqid from 'uniqid';
class CorpableImageUtils {

  constructor () {
    this.imageMaxSize = 1000000000
    this.acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
    this.acceptedFileTypesArray = this.acceptedFileTypes.split(",").map((item) => {return item.trim()})
  }


  verifyFile = (files) => {
    if (files && files.length > 0){
      const currentFile = files[0]
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if(currentFileSize > this.imageMaxSize) {
          alert("This file is not allowed. " + currentFileSize + " bytes is too large")
          return false
      }
      if (!this.acceptedFileTypesArray.includes(currentFileType)){
          alert("This file is not allowed. Only images are allowed.")
          return false
      }
      return true
    }
}

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

  createFileName (img) {
    const name = uniqid();
    const ext = this.extractImageFileExtensionFromBase64(img);
    return `${name}.${ext}`;
  }

  createNewImageFile (base64Image) {
    const filename = this.createFileName(base64Image);
    return this.base64StringtoFile(base64Image, filename);
  }

  image64toCanvasRef (canvasRef, image, pixelCrop) {
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    const img = new Image(pixelCrop.width, pixelCrop.height);
    img.src = image;
    
    const targetX = image.width * pixelCrop.x / 100;
    const targetY = image.height * pixelCrop.y / 100;
    const targetWidth = image.width * pixelCrop.width / 100;
    const targetHeight = image.height * pixelCrop.height / 100;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(
      img,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight
    )
  }
}

export default new CorpableImageUtils();
