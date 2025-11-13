const NotFound = () => {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <div className="rounded-full border border-black bg-white px-4 py-2 text-sm font-semibold text-black">
        404
      </div>
      <h1 className="text-4xl font-bold text-slate-900">
        Page temporairement indisponible
      </h1>
      <p className="max-w-xl text-sm text-slate-600">
        Ce contenu est statique pour l’instant. Ajoutez une redirection ou un
        lien vers la page d’accueil une fois que la navigation sera prête.
      </p>
    </main>
  );
};

export default NotFound;

