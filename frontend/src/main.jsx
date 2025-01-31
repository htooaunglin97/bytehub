import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  BrowserRouter,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import BlogScreen from './screens/BlogScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
import BlogListScreen from './screens/BlogListScreen.jsx';
import BlogEditScreen from './screens/admin/BlogEditScreen.jsx';
import VerifyEmailScreen from './screens/VerifyEmailScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/blogs' element={<BlogListScreen />} />
      <Route path='/blogs/:pageNumber' element={<BlogListScreen />} />
      <Route path='/blog/:id' element={<BlogScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/auth' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/verify-email' element={<VerifyEmailScreen />} />

      <Route element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route
          path='/admin/orderlist/:pageNumber'
          element={<OrderListScreen />}
        />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route
          path='/admin/userlist/:pageNumber'
          element={<UserListScreen />}
        />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/blog/:id/edit' element={<BlogEditScreen />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true, // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  }
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider
          router={router}
          future={{
            v7_partiallyHydration: true,
            v7_normalizeFormMethod: true,
            v7_fetcherPersist: true,
            v7_skipActionErrorRevalidation: true,
            v7_startTransition: true,
          }}
        />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

