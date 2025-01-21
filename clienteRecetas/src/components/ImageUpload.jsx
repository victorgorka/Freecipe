import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ setImageUrl }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setUploadedImageUrl] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:8080/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedImageUrl(response.data); // Set the URL locally in ImageUpload component
      setImageUrl(response.data); // Pass the URL back to the parent component (UserProfile)
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Error uploading image");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
