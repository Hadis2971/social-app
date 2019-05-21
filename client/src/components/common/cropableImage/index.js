import React, { Component } from 'react';
import ReactCrop from 'react-image-crop'
import ImageControls from './imageControls';
import cropableImageUtils from './utils';

import 'react-image-crop/dist/ReactCrop.css';

class CropableImage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      imgSrc: null,
      imgSrcExt: null,
      newImageFile: null,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      }
    };
    this.imageFileRef = React.createRef();
    this.imagePreviewCanvasRef = React.createRef();
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileValid  = cropableImageUtils.verifyFile(e.target.files);
      if (fileValid) {
        const reader = new FileReader();
        reader.addEventListener(
          'load',
          () =>
            this.setState({
              imgSrc: reader.result,
            }),
          false
        )
        reader.readAsDataURL(e.target.files[0])
       }
      }
  }

  handleImageLoaded = (image) => {
    //console.log(image)
  }
  handleOnCropChange = (crop) => {
    this.setState({crop:crop})
  }
  handleOnCropComplete = (crop, pixelCrop) =>{
    const { imgSrc }  = this.state;
    const img = new Image(pixelCrop.width, pixelCrop.height);
    img.src = imgSrc;
    const newImage = cropableImageUtils.createNewImageFile(img.src);
    if (newImage) {
      this.setState({
        newImageFile: newImage
      });
    }
  }

  sendBackNewProfileImage = () => {
    const { getNewProfileImage } = this.props;
    const { newImageFile } = this.state;  
    if (!newImageFile) return;
    getNewProfileImage(newImageFile);
  }

  handleClearToDefault = (event) => {
    this.setState({
      imgSrc: null,
      imgSrcExt: null,
      newImageFile: null,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      }
    });
  }

  render () {
    const { imgSrc } = this.state;
    
    return (
      <div>
      { imgSrc && 
       <ReactCrop
       src={imgSrc} 
       crop={this.state.crop} 
       onImageLoaded={this.handleImageLoaded}
       onComplete = {this.handleOnCropComplete}
       onChange={this.handleOnCropChange}/>
      }      
      <div className={imgSrc ? "custom-file my-3" : "custom-file mb-3"}>
          <input 
              type="file"
              ref={this.imageFileRef} 
              onChange={this.onSelectFile}
              className="custom-file-input" 
              id="cropableImage" 
          />
          <label className="custom-file-label" htmlFor="cropableImage">Choose New Profile Image...</label>
          <div className="invalid-feedback">Invalid File Selected Please Try Different One</div>
      </div>
      <ImageControls 
      sendBackNewProfileImage={this.sendBackNewProfileImage}
      handleClearToDefault={this.handleClearToDefault}
      />
      </div>
    );
  }
}

export default CropableImage;
