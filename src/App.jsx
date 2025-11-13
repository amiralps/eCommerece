import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import Products from "./pages/Products.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductsDetail from "./pages/ProductsDetail.jsx";
import Layout from "./layout/Layout.jsx";

function App1() {
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Navigate to={"/products"} replace />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/products/:id" element={<ProductsDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}

export default App1;
