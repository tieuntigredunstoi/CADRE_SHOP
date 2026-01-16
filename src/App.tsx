import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { initFbclid, initFacebookPixel } from "@/lib/facebookPixel";
import { useFacebookTracking } from "@/hooks/useFacebookTracking";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Customize from "./pages/Customize";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tracking from "./pages/Tracking";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Composant pour gérer le tracking Facebook sur toutes les routes
const AppRoutes = () => {
  useFacebookTracking();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:slug" element={<Product />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/cgv" element={<TermsConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Initialiser le pixel Facebook et le fbclid au chargement initial de l'app
  useEffect(() => {
    // S'assurer que le pixel est initialisé (au cas où le script dans index.html ne se charge pas)
    initFacebookPixel();
    // Initialiser le fbclid
    initFbclid();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CartDrawer />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
