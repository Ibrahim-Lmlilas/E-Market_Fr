import { Link } from "react-router-dom";
import Button from "../ui/Button";

// Type pour les props du composant ProductCard
type ProductCardProps = {
  id?: string;
  title: string;
  description: string;
  prix: number;
  currency?: string;
  imageUrl?: string;
  onAddToCart?: () => void;
};

const ProductCard = (props: ProductCardProps) => {
  // Récupérer les valeurs des props
  const id = props.id;
  const title = props.title;
  const description = props.description;
  const prix = props.prix;
  const currency = props.currency || "€";
  const imageUrl = props.imageUrl;
  const onAddToCart = props.onAddToCart;

  // Formater le prix en euros
  let formattedprix = "";
  if (currency === "€") {
    formattedprix = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(prix);
  } else {
    formattedprix = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
    }).format(prix);
  }

  // Préparer l'URL de l'image
  let imageSrc = "";
  if (imageUrl) {
    // Si l'image commence par http, on l'utilise directement
    if (imageUrl.startsWith("http")) {
      imageSrc = imageUrl;
    } else {
      // Sinon, on ajoute l'URL de base de l'API
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const baseUrl = apiUrl.replace(/\/api$/, "");
      imageSrc = baseUrl + imageUrl;
    }
  }

  // Afficher le composant
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image du produit */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-slate-100">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
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
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 line-clamp-3 text-sm text-slate-600">
            {description}
          </p>
        </div>

        {/* Prix et lien vers les détails */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-base font-semibold text-black">
            {formattedprix}
          </span>
          {id && (
            <Link
              to={`/products/${id}`}
              className="text-sm font-semibold text-black hover:text-slate-600 underline"
            >
              Voir détails
            </Link>
          )}
        </div>

        {/* Bouton ajouter au panier */}
        <Button onClick={onAddToCart} disabled={!onAddToCart}>
          Ajouter au panier
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;

