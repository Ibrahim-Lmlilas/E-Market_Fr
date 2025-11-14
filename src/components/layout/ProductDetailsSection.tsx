import { Link } from "react-router-dom";
import type { Product } from "../../services/productService";

type Props = {
  product: Product;
  mainImage: string | undefined;
  productImages: string[];
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
  formattedPrice: string | null;
};

const ProductDetailsSection = ({ product, mainImage, productImages, selectedImageIndex, onImageSelect, formattedPrice }: Props) => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          {mainImage ? (
            <img src={mainImage} alt={product.title} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm font-medium text-slate-500">Image non disponible</span>
            </div>
          )}
        </div>
        {productImages.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => {
              const isSelected = selectedImageIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => onImageSelect(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                    isSelected ? "border-black" : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <img src={image} alt={`${product.title} - Image ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-6">
        <div>
          {product.category && (
            <span className="mb-2 inline-block rounded-full border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
              {product.category}
            </span>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">{product.title}</h1>
        </div>

        <div>
          <p className="text-4xl font-bold text-black">{formattedPrice}</p>
          {typeof product.stock === "number" && (
            <p className={`mt-2 text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Rupture de stock"}
            </p>
          )}
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="mb-3 text-lg font-semibold text-black">Description</h2>
          <p className="leading-relaxed text-slate-700">{product.description}</p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <Link to="/" className="block">
            <button className="w-full rounded-lg border border-black bg-transparent px-5 py-3 text-base font-semibold text-black transition hover:bg-black hover:text-white">
              Retour aux produits
            </button>
          </Link>
        </div>

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
  );
};

export default ProductDetailsSection;