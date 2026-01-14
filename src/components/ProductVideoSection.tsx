import VideoPlayer from "./VideoPlayer";

const ProductVideoSection = () => {
  return (
    <section className="py-6 md:py-8 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-2">TUTORIEL</p>
          <h2 className="section-title">Comment appliquer vos cils en 5 minutes</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Découvrez notre méthode simple et rapide pour des cils parfaits à chaque fois. Suivez le guide !
          </p>
        </div>

        {/* Video Player */}
        <VideoPlayer 
          src="/videos/tutorial-lashes.mp4"
          title="Tutoriel application LASH GLOW"
        />

        {/* Video Benefits */}
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            { step: "01", title: "Préparez vos cils", desc: "Nettoyez et séchez vos cils naturels" },
            { step: "02", title: "Appliquez la colle", desc: "Une fine couche sur la bande de cils" },
            { step: "03", title: "Positionnez & pressez", desc: "Placez près de la racine et maintenez" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <span className="text-3xl font-display font-bold text-primary/30">{item.step}</span>
              <h3 className="font-semibold text-foreground mt-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductVideoSection;
