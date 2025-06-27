import { Provider } from "react-redux";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AboutUs from "./main/about/about-us.tsx";
import HomePage from "./main/home/homepage.tsx";
import UserHook from "./main/login/index.ts";
import Login from "./main/login/login-form.tsx";
import OrderHistory from "./main/order/order-history.tsx";
import OrderList from "./main/order/order-list.tsx";
import CodPaymentPage from "./main/payment/cod-payment-page.tsx";
import VnpayPaymentPage from "./main/payment/payment-page.tsx";
import PaymentSuccessPage from "./main/payment/payment-success-page.tsx";
import ProductDetail from "./main/product/product-detail.tsx";
import ProductList from "./main/product/product-list.tsx";
import { store } from "./main/reducers.ts";
import MainLayout from "./MainLayout.js";
import "./styles.scss";

const App = () => {
  const { isAuthenticated, userInfo } = UserHook();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated || !userInfo) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const MainLayoutWrapper = () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayoutWrapper />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/payment" element={<VnpayPaymentPage />} />
            <Route path="/payment-offline" element={<CodPaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
          </Route>

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;