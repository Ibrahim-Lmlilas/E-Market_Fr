import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import Button from "../components/ui/Button";
import { getProductById, type Product } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getProductById(id);
        setProduct(result);
      } catch (fetchError) {
        setError("Produit introuvable ou erreur lors du chargement.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const assetBaseUrl = useMemo(
    () => (import.meta.env.VITE_API_URL ?? "").replace(/\/api$/, ""),
    [],
  );

  const firstImage = useMemo(() => {
    if (!product?.images?.length) return undefined;
    const url = product.images[0];
    return url.startsWith("http") ? url : `${assetBaseUrl}${url}`;
  }, [assetBaseUrl, product]);

  const formattedPrice = useMemo(() => {
    if (!product) return null;
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(product.prix ?? 0);
  }, [product]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          fiche produit
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {product ? product.title : "Chargement du produit"}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Découvrez les détails complets de ce produit. Vous pouvez revenir à la
          liste complète à tout moment.
        </p>
      </header>

      {isLoading ? (
        <Loader label="Chargement du produit..." />
      ) : error ? (
        <ErrorMessage description={error}>
          <Link to="/" className="inline-block">
            <Button variant="outline">Retour à la boutique</Button>
          </Link>
        </ErrorMessage>
      ) : product ? (
        <section className="grid gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-[2fr,3fr]">
          <div className="flex flex-col gap-4">
            <div className="flex h-64 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
              {firstImage ? (
                <img
                  src={firstImage}
                  alt={product.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-medium text-slate-500">
                  Image en cours de préparation
                </span>
              )}
            </div>
            <Link
              to="/"
              className="text-center text-sm font-semibold text-emerald-600"
            >
              ← Retour à la liste des produits
            </Link>
          </div>

          <div className="space-y-4 text-slate-700">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {product.title}
              </h2>
              <p className="mt-3 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {product.category && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {product.category}
                </span>
              )}
              {typeof product.stock === "number" && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Stock : {product.stock}
                </span>
              )}
            </div>

            <div className="rounded-md bg-emerald-50 p-4">
              <span className="text-lg font-semibold text-emerald-600">
                {formattedPrice}
              </span>
            </div>

            <Button variant="primary" size="lg">
              Ajouter au panier
            </Button>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default ProductDetails;

