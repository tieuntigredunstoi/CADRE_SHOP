// Facebook Pixel utility functions

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

const FBCLID_STORAGE_KEY = "fbclid";
const PIXEL_ID = "4142361916004324";

/**
 * Initialise le pixel Facebook s'il n'est pas déjà chargé
 */
export const initFacebookPixel = () => {
  if (typeof window === "undefined") return;

  // Initialiser le pixel Facebook même s'il existe déjà (au cas où il ne serait pas complètement chargé)
  (function(f: any, b: any, e: string, v: string, n: any, t: any, s: any) {
    // Créer la fonction fbq si elle n'existe pas
    if (!f.fbq) {
      n = f.fbq = function(...args: any[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = false;
      n.version = "2.0";
      n.queue = [];
    }
    
    // Charger le script seulement s'il n'est pas déjà en cours de chargement
    if (!document.querySelector('script[src="' + v + '"]')) {
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  // Attendre que le pixel soit chargé avant d'initialiser
  const initPixel = () => {
    if (window.fbq && typeof window.fbq === "function") {
      try {
        window.fbq("init", PIXEL_ID);
        // Ne pas envoyer PageView ici car il sera envoyé par le hook useFacebookTracking
      } catch (error) {
        console.error("Error initializing Facebook Pixel:", error);
      }
    }
  };

  // Si le pixel est déjà chargé, initialiser immédiatement
  if (window.fbq && window.fbq.loaded) {
    initPixel();
  } else {
    // Sinon, attendre que le script soit chargé
    const checkLoaded = setInterval(() => {
      if (window.fbq && (window.fbq.loaded || window._fbq)) {
        clearInterval(checkLoaded);
        initPixel();
      }
    }, 50);

    // Timeout après 5 secondes
    setTimeout(() => {
      clearInterval(checkLoaded);
      // Essayer quand même d'initialiser
      if (window.fbq) {
        initPixel();
      }
    }, 5000);
  }
};

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
 * Vérifie que le pixel Facebook est chargé et prêt
 */
const waitForFacebookPixel = (callback: () => void, maxAttempts = 50) => {
  let attempts = 0;
  const checkPixel = () => {
    attempts++;
    if (typeof window !== "undefined" && window.fbq && typeof window.fbq === "function") {
      callback();
    } else if (attempts < maxAttempts) {
      setTimeout(checkPixel, 100);
    } else {
      console.warn("Facebook Pixel not loaded after maximum attempts");
    }
  };
  checkPixel();
};

/**
 * Envoie un événement Facebook Pixel avec le fbclid
 */
export const trackFacebookEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") {
    return;
  }

  const sendEvent = () => {
    if (!window.fbq || typeof window.fbq !== "function") {
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
    try {
      window.fbq("track", eventName, eventParams);
    } catch (error) {
      console.error("Error tracking Facebook event:", error);
    }
  };

  // Si le pixel est déjà chargé, envoyer immédiatement
  if (window.fbq && typeof window.fbq === "function") {
    sendEvent();
  } else {
    // Sinon, attendre que le pixel soit chargé
    waitForFacebookPixel(sendEvent);
  }
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
