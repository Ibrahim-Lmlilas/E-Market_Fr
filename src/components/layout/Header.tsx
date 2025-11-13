import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import logoImage from "../../assets/image copy 2.png";

const navLinkBase =
  "text-sm font-medium uppercase tracking-wide transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

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
    <header className="border-b border-black bg-[#F5F5DC]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoImage}
            alt="E-Market Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold tracking-tight text-black">
            E-MARKET
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                navLinkBase,
                isActive ? "text-black" : "text-slate-600",
              ].join(" ")
            }
          >
            PRODUITS
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  [
                    navLinkBase,
                    isActive ? "text-black" : "text-slate-600",
                  ].join(" ")
                }
              >
                PROFILE
              </NavLink>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span>CART (0)</span>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  isLoading={isLoggingOut}
                  className="rounded-lg border-black text-black hover:bg-black hover:text-white"
                >
                  DÉCONNEXION
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span>CART (0)</span>
              </div>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  [
                    "rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition",
                    isActive
                      ? "bg-black text-white"
                      : "border border-black text-black hover:bg-black hover:text-white",
                  ].join(" ")
                }
              >
                CONNEXION
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  [
                    "rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition",
                    isActive
                      ? "bg-black text-white"
                      : "bg-black text-white hover:bg-slate-800",
                  ].join(" ")
                }
              >
                INSCRIPTION
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

