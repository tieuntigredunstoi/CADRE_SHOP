import { Heart } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary py-2.5 px-4 text-center">
      <p className="text-sm font-medium text-primary-foreground flex items-center justify-center gap-2 flex-wrap">
        <Heart className="h-4 w-4" />
        SAINT-VALENTIN : -50% + Livraison GRATUITE — Livré avant la Saint-Valentin ou remboursé !
        <Heart className="h-4 w-4" />
      </p>
    </div>
  );
};

export default AnnouncementBar;
