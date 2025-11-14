import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
          {/* Products Link */}
          <NavLink
            to="/"
            className={({ isActive }) => {
              if (isActive) {
                return navLinkBase + " text-black";
              } else {
                return navLinkBase + " text-slate-600";
              }
            }}
          >
            PRODUITS
          </NavLink>

          {/* If the user is logged in */}
          {user ? (
            <>
              {/* Profile Link */}
              <NavLink
                to="/profile"
                className={({ isActive }) => {
                  if (isActive) {
                    return navLinkBase + " text-black";
                  } else {
                    return navLinkBase + " text-slate-600";
                  }
                }}
              >
                PROFILE
              </NavLink>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span>CART (0)</span>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-lg border border-black bg-transparent px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoggingOut ? "Déconnexion..." : "DÉCONNEXION"}
                </button>
              </div>
            </>
          ) : (
            /* If the user is not logged in */
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span>CART (0)</span>
              </div>
              {/* Login Link */}
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  const baseClasses = "rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition";
                  if (isActive) {
                    return baseClasses + " bg-black text-white";
                  } else {
                    return baseClasses + " border border-black text-black hover:bg-black hover:text-white";
                  }
                }}
              >
                CONNEXION
              </NavLink>
              {/* Register Link */}
              <NavLink
                to="/register"
                className={({ isActive }) => {
                  const baseClasses = "rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition";
                  if (isActive) {
                    return baseClasses + " bg-black text-white";
                  } else {
                    return baseClasses + " bg-black text-white hover:bg-slate-800";
                  }
                }}
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

