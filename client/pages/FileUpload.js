import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      if (!file) return;
      // Get the pre-signed URL from your Express server
      const response = await axios.get(
        `/api/generate-presigned-url/?fileName=${file.name}&fileType=${file.type}`,
      );
      const url = response.data.url;
      // Use the pre-signed URL to upload the file directly to S3
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      await axios.post(`/api/images/`, {
        fileName: file.name
      });
      alert("File uploaded successfully.");
    } catch (err) {
      console.log('Error uploading files');
      console.log(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default FileUpload;
