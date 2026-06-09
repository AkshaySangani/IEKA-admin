import React, { useState } from "react";
import { config } from "../../../utils/config";
import NoImage from "../../../assets/images/no-image.jpg";

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
};

const BACKEND_URL = config.BACKEND_API_URL || "";

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = NoImage,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    if (!src) {
      return fallbackSrc;
    }

    // Full URL
    if (src.startsWith("blob:") || src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }

    // Relative API Path
    return `${BACKEND_URL}${src}`;
  };

  return (
    <>
      <img
        {...props}
        src={getImageUrl()}
        alt={alt}
        loading="lazy"
        style={{
        //   display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => setImageError(true)}
      />
    </>
  );
};

export default Image;
