import { Box } from "@mui/material";
import { useState } from "react";
import Loader from "./Loader";

type TProps = {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
};

function ImagePlaceholder({ src, alt, width, height }: TProps) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <Box sx={{ width, height, position: "relative" }}>
      {!loaded && <Loader />}
      <img
        height={height}
        style={{ width }}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
      />
    </Box>
  );
}

export default ImagePlaceholder;
