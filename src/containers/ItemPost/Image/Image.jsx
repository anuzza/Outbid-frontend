import { useState } from "react";
import { RMIUploader } from "react-multiple-image-uploader";

const Image = () => {
  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible((prev) => !prev);
  };
  const hideModal = () => {
    setVisible(true);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  return (
    <div className="App">
      <h1>Upload the item's image</h1>
      <RMIUploader
        isOpen={visible}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
      />
    </div>
  );
};

export default Image;
