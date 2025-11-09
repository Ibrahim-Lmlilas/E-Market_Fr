const ProductDetails = () => {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          fiche produit
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Nom du produit (statique)
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Cette page affichera les informations détaillées d’un produit. Pour
          l’instant, le contenu est statique.
        </p>
      </header>

      <section className="grid gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-[2fr,3fr]">
        <div className="h-64 rounded-lg bg-slate-200" />
        <div className="space-y-4 text-slate-700">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            mollitia quod dicta, reprehenderit earum, magnam aliquid quidem
            placeat dolorem veniam alias ducimus. Remplace ce paragraphe avec la
            description, les caractéristiques et les options du produit.
          </p>
          <div className="rounded-lg bg-emerald-50 p-4">
            <span className="text-lg font-semibold text-emerald-600">
              Prix : 149,99 €
            </span>
          </div>
          <ul className="list-disc space-y-2 pl-6 text-sm">
            <li>Caractéristique 1</li>
            <li>Caractéristique 2</li>
            <li>Caractéristique 3</li>
          </ul>
          <button className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Ajouter au panier
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;

