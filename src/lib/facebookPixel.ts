// Facebook Pixel utility functions

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

const FBCLID_STORAGE_KEY = "fbclid";

/**
 * Récupère le fbclid de l'URL et le stocke dans localStorage
 */
export const initFbclid = (): string | null => {
  // Récupérer le fbclid de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");

  if (fbclid) {
    // Stocker dans localStorage pour toutes les pages
    localStorage.setItem(FBCLID_STORAGE_KEY, fbclid);
    return fbclid;
  }

  // Si pas dans l'URL, vérifier s'il existe déjà dans localStorage
  const storedFbclid = localStorage.getItem(FBCLID_STORAGE_KEY);
  return storedFbclid;
};

/**
 * Récupère le fbclid stocké dans localStorage
 */
export const getFbclid = (): string | null => {
  return localStorage.getItem(FBCLID_STORAGE_KEY);
};

/**
 * Envoie un événement Facebook Pixel avec le fbclid
 */
export const trackFacebookEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.fbq) {
    console.warn("Facebook Pixel not initialized");
    return;
  }

  const fbclid = getFbclid();
  
  // Préparer les paramètres avec le fbclid
  const eventParams = {
    ...params,
    ...(fbclid && { fbclid }),
  };

  // Envoyer l'événement avec les paramètres
  window.fbq("track", eventName, eventParams);
};

/**
 * Envoie l'événement PageView avec fbclid
 */
export const trackPageView = () => {
  trackFacebookEvent("PageView");
};

/**
 * Envoie l'événement ViewContent avec fbclid
 */
export const trackViewContent = (contentData?: Record<string, any>) => {
  trackFacebookEvent("ViewContent", contentData);
};

/**
 * Envoie l'événement AddToCart avec fbclid
 */
export const trackAddToCart = (contentData?: Record<string, any>) => {
  trackFacebookEvent("AddToCart", contentData);
};

/**
 * Envoie l'événement InitiateCheckout avec fbclid
 */
export const trackInitiateCheckout = (contentData?: Record<string, any>) => {
  trackFacebookEvent("InitiateCheckout", contentData);
};
