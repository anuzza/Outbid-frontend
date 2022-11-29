import React from "react";
import ImageUploading from "react-images-uploading";
import { FaTrashAlt } from "react-icons/fa";
import "./Upload.css";

const Upload = ({ images, setImages, setImageSrc, imageSrc, id }) => {
  const maxNumber = 3;
  const acceptType = ["jpeg", "jpg", "png"];
  const maxFileSize = 5000000;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const onError = () => {};

  return (
    <div className="container">
      <h3>Upload the item's image</h3>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        onError={onError}
        maxNumber={maxNumber}
        acceptType={acceptType}
        maxFileSize={maxFileSize}
        dataURLKey="data_url"
        className="uploader"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <>
            {errors && (
              <span className="errors">
                <ul>
                  {errors.maxNumber && (
                    <li>Number of selected images exceed maxNumber!</li>
                  )}
                  {errors.acceptType && (
                    <li>Your selected file type is not allowed!</li>
                  )}
                  {errors.maxFileSize && (
                    <li>Selected file size exceed maxFileSize!</li>
                  )}
                </ul>
              </span>
            )}

            <div className="upload__image-wrapper">
              <div
                className="upload-container"
                {...dragProps}
                onClick={onImageUpload}
                style={
                  isDragging
                    ? { backgroundColor: "#afafaf", color: "white" }
                    : undefined
                }
              >
                Choose a file or Drag it here (Maximum 3)
              </div>

              <div className="p-2" style={{ textAlign: "left" }}>
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item  "
                    style={{
                      width: "150px",
                      marginRight: "10px",
                      display: "inline-block",
                    }}
                  >
                    <div className="image-item__btn-wrapper">
                      <div size="sm" style={{ width: "100%" }}>
                        <button
                          className="success"
                          onClick={(e) => {
                            e.preventDefault();
                            onImageUpdate(index);
                          }}
                        >
                          Replace
                        </button>
                        <button
                          className="delete"
                          onClick={() => {
                            onImageRemove(index);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                    <img
                      src={image["data_url"]}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
              {images.length > 0 && (
                <div className="buttonRemove">
                  <button
                    onClick={() => {
                      onImageRemoveAll();
                    }}
                    className="remove"
                  >
                    Remove All Images
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default Upload;
