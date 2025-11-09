import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const navLinkBase =
  "text-sm font-medium transition hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold text-emerald-600">
          E-Market
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                navLinkBase,
                isActive ? "text-emerald-600" : "text-slate-600",
              ].join(" ")
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/products/preview"
            className={({ isActive }) =>
              [
                navLinkBase,
                isActive ? "text-emerald-600" : "text-slate-600",
              ].join(" ")
            }
          >
            Produits
          </NavLink>
        </nav>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-slate-600 sm:inline">
              Bonjour, {user.fullName.split(" ")[0]}
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              isLoading={isLoggingOut}
            >
              Déconnexion
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                [
                  "rounded-md px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-300 text-slate-700 hover:border-emerald-200 hover:text-emerald-600",
                ].join(" ")
              }
            >
              Connexion
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                [
                  "rounded-md px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-500 text-white hover:bg-emerald-600",
                ].join(" ")
              }
            >
              Inscription
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

