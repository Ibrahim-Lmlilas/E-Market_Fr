import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="overflow-hidden bg-white px-6 py-20 sm:px-12">
      <div className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold leading-none tracking-tight text-black sm:text-8xl">
            E-MARKET
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Découvrez notre collection soigneusement sélectionnée de produits,
            conçus pour améliorer votre style de vie moderne.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="uppercase tracking-wide">
            Explorer la collection
          </Button>
          <Button variant="outline" size="lg" className="uppercase tracking-wide">
            Voir les nouveautés
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

