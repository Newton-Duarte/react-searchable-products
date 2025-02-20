type ProductImageProps = {
  image: string;
  alt?: string;
  className?: ClassName;
};

export function ProductImage({ image, alt, className }: ProductImageProps) {
  return (
    <img
      className={`h-48 object-contain mx-auto ${className}`}
      src={image}
      alt={alt}
    />
  );
}
