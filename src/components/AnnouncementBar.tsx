import { Flame } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary py-2.5 px-4 text-center">
      <p className="text-sm font-medium text-primary-foreground flex items-center justify-center gap-2">
        <Flame className="h-4 w-4" />
        LIVRAISON GRATUITE + 50€ de réduction — Offre limitée !
        <Flame className="h-4 w-4" />
      </p>
    </div>
  );
};

export default AnnouncementBar;
