import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  isBestSeller?: boolean;
}

const ProductCard = ({ image, title, price, isBestSeller }: ProductCardProps) => {
  return (
    <a 
      href="#" 
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
          <span className="absolute top-4 left-4 bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
            Best-seller
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-2 font-body">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{price}</span>
          <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Voir <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
