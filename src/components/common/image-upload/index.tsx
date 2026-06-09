import { useEffect, useRef, useState } from "react";
import Image from "../image";

interface ImageUploadProps {
  label: string;
  required?: boolean;
  value?: string | File | null;
  onChange?: (file: File | null) => void;
  error?: string;
}

const ImageUpload = ({
  label,
  required,
  value = "",
  onChange,
  error,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>("");
  const [fileName, setFileName] = useState<string>("No file chosen");

  const [imageError, setError] = useState("");

  useEffect(() => {
  if (!value) {
    setPreview("");
    setFileName("No file chosen");
    return;
  }

  if (typeof value === "string") {
    setPreview(value);
    setFileName(value.split("/").pop() || "Image");
  } else if (value instanceof File) {
    setPreview(URL.createObjectURL(value));
    setFileName(value.name);
  }
}, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    const maxSize = 1 * 1024 * 1024; // 50 MB

    // File Type Validation
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG and PNG files are allowed.");

      e.target.value = "";
      return;
    }

    // File Size Validation
    if (file.size > maxSize) {
      setError("File size must be less than 50 MB.");

      e.target.value = "";
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));

    onChange?.(file);
  };

  const handleRemove = () => {
    setPreview("");
    setFileName("No file chosen");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onChange?.(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}

        {required && <span className="text-error ml-1">*</span>}
      </label>

      <div className="flex flex-col gap-3">
        {!preview && (
          <div className="flex items-start gap-10 border border-gray-300 p-2">
            {/* File Input */}
            <div className="flex-1 ">
              <div className="flex ">
                <label
                  htmlFor="logo-upload"
                  className="bg-gray-500 text-white px-2 flex items-center cursor-pointer whitespace-nowrap"
                >
                  Choose File
                </label>

                <input
                  ref={fileInputRef}
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex items-center px-3 overflow-hidden text-ellipsis whitespace-nowrap">
                  {fileName}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="relative w-[100px] h-[100px]">
            <Image src={preview} alt="preview" className="w-[100px] h-[100px] border border-gray-300 object-contain"/>

            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white shadow-md flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {(error || imageError) && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ImageUpload;
