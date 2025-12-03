"use client";

import { useRef, useState } from "react";
import AddImageIcon from "@/_icons/AddImageIcon";

export default function ImagePicker() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Browser дээр preview харуулах
    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);
  };

  return (
    <div
      className="w-[412px] h-[160px] flex items-center justify-center rounded-lg
                 border border-dashed border-[rgba(37,99,235,0.20)]
                 bg-[rgba(37,99,235,0.05)] cursor-pointer"
      onClick={handleSelect}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        // onChange={handleFileChange}
          onChange={handleLogoUpload}
        disabled={uploading}
      />

      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
          <AddImageIcon />
        </div>
      )}
    </div>
  );
}
