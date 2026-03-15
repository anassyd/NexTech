import Image from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";

interface ProductImageProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

function ProductImage({ product, className, size = "md" }: ProductImageProps) {
  const sizeClasses = {
    sm: "h-32 w-32",
    md: "h-48 w-full",
    lg: "h-80 w-full",
  };

  const hasImage = product.images.length > 0;

  if (hasImage) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted",
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={size === "sm" ? "128px" : size === "lg" ? "640px" : "320px"}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg bg-gradient-to-br",
        product.color,
        sizeClasses[size],
        className
      )}
    >
      <div className="text-center">
        <div className="text-3xl font-bold text-white/90">
          {product.brand.charAt(0)}
        </div>
        <div className="mt-1 text-xs font-medium text-white/60">
          {product.brand}
        </div>
      </div>
    </div>
  );
}

export { ProductImage };
