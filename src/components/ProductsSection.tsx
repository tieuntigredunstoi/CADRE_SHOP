import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import productNightSky from "@/assets/product-night-sky.webp";
import productSpotify from "@/assets/product-spotify.webp";
import productStreetSign from "@/assets/product-street-sign.webp";
import productCoordinates from "@/assets/product-coordinates.webp";
import productPerfectMatch from "@/assets/product-perfect-match.webp";

const products = [
  {
    id: 1,
    slug: "the-night-we-met",
    image: productNightSky,
    title: "The Night We Met — Carte du ciel",
    price: "9,99 €",
    originalPrice: "20,00 €",
    isBestSeller: true,
  },
  {
    id: 2,
    slug: "our-song",
    image: productSpotify,
    title: "Our Song — Lecteur Spotify",
    price: "9,99 €",
    originalPrice: "20,00 €",
    isBestSeller: false,
  },
  {
    id: 3,
    slug: "street-sign",
    image: productStreetSign,
    title: "Street Sign — Noms croisés",
    price: "9,99 €",
    originalPrice: "20,00 €",
    isBestSeller: false,
  },
  {
    id: 4,
    slug: "coordinates",
    image: productCoordinates,
    title: "Coordinates — Lieu de rencontre",
    price: "9,99 €",
    originalPrice: "20,00 €",
    isBestSeller: false,
  },
  {
    id: 5,
    slug: "perfect-match",
    image: productPerfectMatch,
    title: "Perfect Match — Union des cœurs",
    price: "9,99 €",
    originalPrice: "20,00 €",
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
            <p className="section-label mb-2">NOS MODÈLES</p>
            <h2 className="section-title">Immortalisez vos moments</h2>
          </div>
          <Link 
            to="/product"
            className="mt-4 md:mt-0 text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              image={product.image}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              isBestSeller={product.isBestSeller}
            />
          ))}
        </div>

        {/* View All Button (Mobile) */}
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/product"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            Voir tous les modèles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
