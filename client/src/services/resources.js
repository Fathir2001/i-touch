import api from "./api";

// Products
export const fetchProducts = (params = {}) => api.get("/products", { params });
export const fetchFeaturedProducts = () => api.get("/products/featured");
export const fetchProductBySlug = (slug) => api.get(`/products/${slug}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Categories
export const fetchCategories = (params = {}) => api.get("/categories", { params });
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Offers
export const fetchActiveOffers = () => api.get("/offers");
export const fetchAllOffers = () => api.get("/offers/admin");
export const createOffer = (data) => api.post("/offers", data);
export const updateOffer = (id, data) => api.put(`/offers/${id}`, data);
export const deleteOffer = (id) => api.delete(`/offers/${id}`);

// Gaming bookings
export const createGamingBooking = (data) => api.post("/gaming-bookings", data);
export const fetchGamingBookings = () => api.get("/gaming-bookings");
export const updateGamingBookingStatus = (id, status) =>
  api.put(`/gaming-bookings/${id}`, { status });
export const deleteGamingBooking = (id) => api.delete(`/gaming-bookings/${id}`);

// Contact
export const createContactMessage = (data) => api.post("/contact", data);
export const fetchContactMessages = () => api.get("/contact");
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`);

// Admin
export const adminLogin = (data) => api.post("/admin/login", data);
export const fetchDashboardSummary = () => api.get("/admin/dashboard-summary");

// Upload
export const uploadImages = (formData) =>
  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
