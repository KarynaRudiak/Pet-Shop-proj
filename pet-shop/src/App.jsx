import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import NotFound from "./pages/NotFound/NotFound";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import AllProducts from "./pages/Products/AllProducts/AllProducts";
import ProductsByCategoryPage from "./pages/Products/ByCategories/ProductsByCategoryPage";
import DiscountedProductsPage from "./pages/Products/AllSales/DiscountedProductsPage";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetails";
import CartPage from "./pages/CartPage/CartPage";

import ModalWindow from "./components/ModalWindow/ModalWindow";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<ProductsByCategoryPage />} />
        <Route path="sale" element={<DiscountedProductsPage />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ModalWindow />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
