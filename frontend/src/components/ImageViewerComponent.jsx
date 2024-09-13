import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Importo plugin per funzionalità aggiuntive
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ImageViewerComponent = ({ images, isOpen, onClose }) => {
    return (
      <Lightbox
        open={isOpen}
        close={onClose}
        slides={images.map(src => ({ src }))}
        plugins={[Zoom, Thumbnails]}
      />
    );
  };
  
  export default ImageViewerComponent;