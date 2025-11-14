import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { isInitializing } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login page  */}
        <Route
          path="/login"
          element={
            <div className="h-screen w-full bg-white">
              <Login />
            </div>
          }
        />
        {/* Register page  */}
        <Route
          path="/register"
          element={
            <div className="h-screen w-full bg-white">
              <Register />
            </div>
          }
        />
        {/* Header  Footer */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen flex-col bg-surface">
              <Header />
              <main className="flex-1">
                {isInitializing ? (
                  <div className="flex h-full items-center justify-center py-20">
                    <p className="text-slate-600">Chargement de l'application...</p>
                  </div>
                ) : (
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                )}
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

