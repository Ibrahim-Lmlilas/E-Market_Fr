import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-5xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          catalogue
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Derniers produits</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Cette page est statique pour l’instant. Remplace ces données fictives
          par la liste des produits provenant de l’API.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCard
            key={index}
            id={String(index + 1)}
            title={`Produit #${index + 1}`}
            description="Description fictive. Remplacez avec les informations de l’API."
            price={99.99}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;

