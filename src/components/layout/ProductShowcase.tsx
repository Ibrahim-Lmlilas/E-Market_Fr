import ProductCard from "../cards/ProductCard";
import ErrorMessage from "../ui/ErrorMessage";
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
          Les informations sont chargées dynamiquement depuis l’API.
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-slate-600">Chargement des produits...</p>
      ) : error ? (
        <ErrorMessage description={error} />
      ) : products.length === 0 ? (
        <p className="text-center text-slate-600">
          Aucun produit disponible pour le moment.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              description={product.description}
              prix={product.prix ?? 0}
              imageUrl={product.images?.[0]}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductShowcase;

