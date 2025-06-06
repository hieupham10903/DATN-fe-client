import { Provider } from "react-redux";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./main/home/homepage.tsx";
import UserHook from "./main/login/index.ts";
import Login from "./main/login/login-form.tsx";
import ProductDetail from "./main/product/product-detail.tsx";
import ProductList from "./main/product/product-list.tsx";
import { store } from "./main/reducers.ts";
import MainLayout from "./MainLayout.js";
import "./styles.scss";

const App = () => {
  const { isAuthenticated } = UserHook();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
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
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;