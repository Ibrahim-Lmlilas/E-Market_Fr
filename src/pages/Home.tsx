import { useEffect, useState } from "react";
import HeroSection from "../components/layout/HeroSection";
import ProductShowcase from "../components/layout/ProductShowcase";
import { getProducts, type Product } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setProducts(result);
      } catch (fetchError) {
        setError("Impossible de charger les produits pour le moment.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col gap-16 px-4 py-12">
      <HeroSection />
      <ProductShowcase
        products={products}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
};

export default Home;

