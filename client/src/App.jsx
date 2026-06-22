import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./hooks/useAuth";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import SportsCategory from "./pages/SportsCategory";
import SportswearCategory from "./pages/SportswearCategory";
import GamingZone from "./pages/GamingZone";
import MobileSection from "./pages/MobileSection";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminOffers from "./pages/AdminOffers";
import AdminBookings from "./pages/AdminBookings";
import AdminMessages from "./pages/AdminMessages";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{ style: { background: "#1c1c26", color: "#f5f5fa" } }} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/sports" element={<SportsCategory />} />
          <Route path="/sportswear" element={<SportswearCategory />} />
          <Route path="/gaming" element={<GamingZone />} />
          <Route path="/mobile" element={<MobileSection />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
