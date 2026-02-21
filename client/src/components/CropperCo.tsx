import React, { useState } from "react";
import ImageCropper from "../components/Image/ImageCrop";
import { getCroppedImg } from "../utility/getCropedImage";

const CropperImage = () => {
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCropDone = async (imageSrc, croppedAreaPixels) => {
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };

  return (
    <div>
      <h2>Upload and Crop Image</h2>
      {/* <ImageCropper onCropDone={handleCropDone} /> */}
      {/* {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )} */}
    </div>
  );
};

export default CropperImage;
