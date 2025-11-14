import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, type Product } from "../services/productService";
import ProductDetailsSection from "../components/layout/ProductDetailsSection";

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
    const prix = product.prix ?? 0;
    return prix + " MAD";
  }, [product]);

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-slate-600">Chargement du produit...</p>
        </div>
      ) : error ? (
        <div className="py-20">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="text-sm text-red-600">{error}</p>
            <Link to="/" className="mt-4 inline-block">
              <button className="rounded-lg border border-black bg-transparent px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                Retour à la boutique
              </button>
            </Link>
          </div>
        </div>
      ) : product ? (
        <ProductDetailsSection
          product={product}
          mainImage={mainImage}
          productImages={productImages}
          selectedImageIndex={selectedImageIndex}
          onImageSelect={setSelectedImageIndex}
          formattedPrice={formattedPrice}
        />
      ) : null}
    </main>
  );
};

export default ProductDetails;

