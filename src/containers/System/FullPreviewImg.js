import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

//src15, 1h02ms07ss
export default class FullPreviewImg extends Component {
  closeFullImg = () => {
    this.props.previewClick();
  };

  render() {
    const { imgUrl } = this.props;
    return (
      <div>
        {<Lightbox mainSrc={imgUrl} onCloseRequest={this.closeFullImg} />}
      </div>
    );
  }
}
