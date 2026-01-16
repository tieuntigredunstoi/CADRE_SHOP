import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initFbclid, trackPageView } from "@/lib/facebookPixel";

/**
 * Hook pour suivre automatiquement les vues de page avec Facebook Pixel
 * et initialiser le fbclid au changement de route
 */
export const useFacebookTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialiser le fbclid à chaque changement de page
    initFbclid();

    // Envoyer PageView avec fbclid
    trackPageView();
  }, [location.pathname]);
};
