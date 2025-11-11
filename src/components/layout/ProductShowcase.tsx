import ProductCard from "../cards/ProductCard";
import Loader from "../ui/Loader";
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
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Catalogue
        </p>
        <h2 className="text-3xl font-bold text-slate-900">Nos produits récents</h2>
        <p className="text-sm text-slate-600">
          Les informations sont chargées dynamiquement depuis l’API.
        </p>
      </div>

      {isLoading ? (
        <Loader label="Chargement des produits..." />
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

