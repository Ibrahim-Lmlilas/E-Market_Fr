import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-14 text-white shadow-lg sm:px-12">
      <div className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wide">
          Bienvenue sur E-Market
        </span>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Des produits choisis avec soin, livrés jusqu’à chez vous.
        </h1>
        <p className="text-base text-emerald-50 sm:text-lg">
          Parcourez notre catalogue et trouvez l’article idéal. Inscrivez-vous
          pour recevoir les nouveautés et profiter de nos meilleures offres.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg">Voir les nouveautés</Button>
          <Button variant="outline" size="lg">
            Parcourir le catalogue
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

