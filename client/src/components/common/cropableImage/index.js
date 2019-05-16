import React, { Component } from 'react';
import Cropper from 'react-easy-crop';
import ImagePreview from './imagePreview';
import uniqid from 'uniqid';
import cropableImageUtils from './utils';
class CropableImage extends Component {
  constructor (props) {
    super(props);
    this.state = {
        imageSrc: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 4 / 3,
    };
    this.imagePreviewCanvasRef = React.createRef();
  }

  onFileChange = (event) => {
    const files = event.target.files
    if (files && files.length > 0){
      const currentFile = files[0];
      const myFileItemReader = new FileReader()
      myFileItemReader.addEventListener("load", ()=>{
          const myResult = myFileItemReader.result
          this.setState({
          imageSrc: myResult
          });
      }, false)
      
      myFileItemReader.readAsDataURL(currentFile)
      }
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    const { imageSrc } = this.state;
    const canvasRef = this.imagePreviewCanvasRef.current
    cropableImageUtils.image64toCanvasRef(canvasRef, imageSrc ,croppedAreaPixels);
  }

  sendBackNewProfileImage = () => {
    const { imageSrc } = this.state;  
    if (!imageSrc) return;
      const canvas = this.imagePreviewCanvasRef.current;
      const { getNewProfileImage } = this.props;
      const filename = uniqid();
      const ext = cropableImageUtils.extractImageFileExtensionFromBase64(imageSrc);
      const imageData64 = canvas.toDataURL('image/' + ext);
      const newImage = cropableImageUtils.base64StringtoFile(imageData64, (`${filename}.${ext}`));
      getNewProfileImage(newImage);
  }

  onZoomChange = zoom => {
    this.setState({ zoom })
  }

  handleClearToDefault = (event) => {
    if (event) event.preventDefault();
    let canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.setState({
      imageSrc: null,
      crop: {
        aspect: 4 / 3
      }

    });
  }

  render () {
    const { imageSrc, crop, zoom, aspect } = this.state;
    
    return (
      <div style={{margin: 'auto', width: '100%'}}>
      
      {imageSrc && 
      <div style={{position: 'relative', width: '100%', height: '400px', margin: 'auto'}}>
        <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={this.onCropChange}
        onCropComplete={this.onCropComplete}
        onZoomChange={this.onZoomChange}
        />
        </div> }
        
        <div className={imageSrc ? "custom-file my-3" : "custom-file mb-3"}>
            <input 
                type="file" 
                onChange={this.onFileChange}
                className="custom-file-input" 
                id="cropableImage" 
            />
            <label className="custom-file-label" htmlFor="cropableImage">Choose New Profile Image...</label>
            <div className="invalid-feedback">Invalid File Selected Please Try Different One</div>
        </div>
        <p className='lead text-center' style={{color: '#3399ff'}}>Your Image Preview Will Display Below</p>
        {imageSrc && 
          <ImagePreview 
          sendBackNewProfileImage={this.sendBackNewProfileImage}
          handleClearToDefault={this.handleClearToDefault}
          canvasRef={this.imagePreviewCanvasRef}/>}
      </div>
    );
  }
}

export default CropableImage;
