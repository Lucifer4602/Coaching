import React from "react";

const CustomFileUploader = ({ name, types, className, handleChange }) => {
  const handleFileChange = (file) => {
    handleChange(file);
  };

  return (
    <div style={{ width: "80%" }}>
      <input
        type="file"
        name={name}
        accept={types}
        onChange={(e) => handleFileChange(e.target.files[0])}
        className={className}
      />
    </div>
  );
};

export default CustomFileUploader;
