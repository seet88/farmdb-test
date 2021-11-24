import React, { Fragment, useState } from "react";
import { Camera, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import classes from "./CImage.module.css";

const CImage = ({ field, mode }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [images, setImages] = useState(String(field.value).split("\n"));

  const handleTakePhoto = (dataUri) => {
    console.log("takePhoto", dataUri);
    setImages([...images, dataUri]);
    setShowCamera(false);
  };
  const deleteImageHandler = (idx) => {
    const newImages = [...images];
    newImages.splice(idx, 1);
    setImages(newImages);
  };

  if (mode === "edit")
    return (
      <ul className={classes.list}>
        {images.map(
          (src, idx) =>
            src.length > 5 && (
              <li key={idx}>
                <img src={src} alt="Wrong path" width={325}></img>
                <button onClick={() => deleteImageHandler(idx)}>X</button>
              </li>
            )
        )}

        {showCamera && (
          <li key={9998}>
            <Camera
              isImageMirror={false}
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
            />
          </li>
        )}
        {!showCamera && (
          <li key={9999}>
            <button
              onClick={() => {
                setShowCamera(true);
              }}
            >
              Camera
            </button>
            <button>Store</button>
          </li>
        )}
      </ul>
    );
  if (!field?.value) return <div></div>;
  return (
    <Fragment>
      {mode === "view" &&
        images.map((src, idx) => (
          <img src={src} alt="Wrong path" width={325} key={idx}></img>
        ))}
    </Fragment>
  );
};

export default CImage;
