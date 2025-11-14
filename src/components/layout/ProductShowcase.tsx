import { Link } from "react-router-dom";
import type { Product } from "../../services/productService";

type ProductShowcaseProps = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
};

const ProductShowcase = ({
  products,
  isLoading,
  error,
}: ProductShowcaseProps) => {
  return (
    <section>
      <div className="mb-8 space-y-2 text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Catalogue
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-black">
          Nos produits récents
        </h2>
        <p className="text-sm text-slate-600">
          Les informations sont chargées dynamiquement depuis l'API.
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-slate-600">Chargement des produits...</p>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-slate-600">
          Aucun produit disponible pour le moment.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            // Formater le prix en MAD
            const prix = product.prix ?? 0;
            const formattedprix = prix + " MAD";

            // Préparer l'URL de l'image
            let imageSrc = "";
            const imageUrl = product.images?.[0];
            if (imageUrl) {
              if (imageUrl.startsWith("http")) {
                imageSrc = imageUrl;
              } else {
                const apiUrl = import.meta.env.VITE_API_URL || "";
                const baseUrl = apiUrl.replace(/\/api$/, "");
                imageSrc = baseUrl + imageUrl;
              }
            }

            return (
              <article
                key={product._id}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image du produit */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-slate-100">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-500">
                      Image en attente
                    </div>
                  )}
                </div>

                {/* Informations du produit */}
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {product.title}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-sm text-slate-600">
                      {product.description}
                    </p>
                  </div>

                  {/* Prix et lien vers les détails */}
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-black">
                      {formattedprix}
                    </span>
                    {product._id && (
                      <Link
                        to={`/products/${product._id}`}
                        className="text-sm font-semibold text-black hover:text-slate-600 underline"
                      >
                        Voir détails
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductShowcase;

