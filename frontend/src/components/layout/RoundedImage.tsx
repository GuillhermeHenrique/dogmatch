import classes from "./RoundedImage.module.css";

type RoundedImageProps = {
  src: string;
  alt: string;
  width: "small" | "medium" | "large";
};

const RoundedImage: React.FC<RoundedImageProps> = ({ src, alt, width }) => {
  return (
    <img
      className={`${classes.rounded_image} ${classes[width]}`}
      src={src}
      alt={alt}
    />
  );
};

export default RoundedImage;
