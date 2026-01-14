import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  slug: string;
  isBestSeller?: boolean;
}

const ProductCard = ({ image, title, price, originalPrice, slug, isBestSeller }: ProductCardProps) => {
  return (
    <Link 
      to={`/product/${slug}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isBestSeller && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            Best-seller
          </Badge>
        )}
        {originalPrice && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
            -50%
          </Badge>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-2 font-body">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-primary font-semibold">{price}</span>
            {originalPrice && (
              <span className="text-muted-foreground text-sm line-through">{originalPrice}</span>
            )}
          </div>
          <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Voir <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
