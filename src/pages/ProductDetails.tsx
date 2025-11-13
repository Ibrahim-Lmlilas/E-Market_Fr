import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import Button from "../components/ui/Button";
import { getProductById, type Product } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const productImages = useMemo(() => {
    if (!product?.images?.length) return [];
    return product.images.map((url) =>
      url.startsWith("http") ? url : `${assetBaseUrl}${url}`,
    );
  }, [assetBaseUrl, product]);

  const mainImage = useMemo(() => {
    return productImages[selectedImageIndex] || productImages[0];
  }, [productImages, selectedImageIndex]);

  const formattedPrice = useMemo(() => {
    if (!product) return null;
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(product.prix ?? 0);
  }, [product]);

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-slate-600">Chargement du produit...</p>
        </div>
      ) : error ? (
        <div className="py-20">
          <ErrorMessage description={error}>
            <Link to="/" className="inline-block mt-4">
              <Button variant="outline">Retour à la boutique</Button>
            </Link>
          </ErrorMessage>
        </div>
      ) : product ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Section - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-sm font-medium text-slate-500">
                    Image non disponible
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                      selectedImageIndex === index
                        ? "border-black"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Section - Product Info */}
          <div className="flex flex-col space-y-6">
            {/* Title and Category */}
            <div>
              {product.category && (
                <span className="mb-2 inline-block rounded-full border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                  {product.category}
                </span>
              )}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div>
              <p className="text-4xl font-bold text-black">{formattedPrice}</p>
              {typeof product.stock === "number" && (
                <p
                  className={`mt-2 text-sm font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `En stock (${product.stock} disponibles)`
                    : "Rupture de stock"}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-slate-200 pt-6">
              <h2 className="mb-3 text-lg font-semibold text-black">
                Description
              </h2>
              <p className="leading-relaxed text-slate-700">
                {product.description}
              </p>
            </div>

            {/* Back to Products Button */}
            <div className="border-t border-slate-200 pt-6">
              <Link to="/" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="rounded-lg"
                >
                  Retour aux produits
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="border-t border-slate-200 pt-6">
              <dl className="space-y-3 text-sm">
                {product._id && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-600">Référence</dt>
                    <dd className="text-slate-900">{product._id}</dd>
                  </div>
                )}
                {product.category && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-600">Catégorie</dt>
                    <dd className="text-slate-900">{product.category}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default ProductDetails;

