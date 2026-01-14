import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import productLashes from "@/assets/product-lashes.jpg";
import productBundle from "@/assets/product-bundle.jpg";

const products = [
  {
    id: 1,
    image: productLashes,
    title: "LASH GLOW - Faux cils individuels",
    price: "19,99 €",
    isBestSeller: true,
  },
  {
    id: 2,
    image: productBundle,
    title: "LASH GLOW - Bundle de 2",
    price: "39,99 €",
    isBestSeller: false,
  },
];

const ProductsSection = () => {
  return (
    <section className="bg-background py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">NOS BEST-SELLERS</p>
            <h2 className="section-title">Produits phares</h2>
          </div>
          <a 
            href="#" 
            className="mt-4 md:mt-0 text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Voir tout <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              isBestSeller={product.isBestSeller}
            />
          ))}
        </div>

        {/* View All Button (Mobile) */}
        <div className="mt-8 text-center md:hidden">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            Voir tous les produits <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
