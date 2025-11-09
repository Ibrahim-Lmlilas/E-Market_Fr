import { Link } from "react-router-dom";
import Button from "../ui/Button";
import type { MouseEventHandler } from "react";

export type ProductCardProps = {
  id?: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  imageUrl?: string;
  onAddToCart?: MouseEventHandler<HTMLButtonElement>;
};

const ProductCard = ({
  id,
  title,
  description,
  price,
  currency = "€",
  imageUrl,
  onAddToCart,
}: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency === "€" ? "EUR" : currency,
  }).format(price);

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
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

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 line-clamp-3 text-sm text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-base font-semibold text-emerald-600">
            {formattedPrice}
          </span>
          {id ? (
            <Link
              to={`/products/${id}`}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Voir détails
            </Link>
          ) : null}
        </div>

        <Button onClick={onAddToCart} disabled={!onAddToCart}>
          Ajouter au panier
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;

