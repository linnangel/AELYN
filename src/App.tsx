import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useLayoutEffect } from "react";
import { useStore } from "./store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import History from "./pages/History";
import About from "./pages/About";
import Login from "./pages/Login";
import Support from "./pages/Support";

function Layout() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const location = useLocation();
  const { pathname } = location;
  const isLoginPage = pathname === "/login";

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/profile"
            element={
              isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/support/:slug" element={<Support />} />
          <Route
            path="/history"
            element={
              isLoggedIn ? <History /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/wishlist"
            element={
              isLoggedIn ? <Wishlist /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
