import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadAuthFromStorage } from "./redux/authSlice";
import { fetchAndSetUserAddresses } from "./firebase/firebaseAddressHelpers";

//Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import About from "./addition_things/About";
import Products from "./home_components/Products";
import SingleProduct from "./components/SingleProduct";
import Search from "./home_components/Search";
import Category from './home_components/Category';
import HeaderCategory from "./home_components/HeaderCategory";
import { PrivacyPolicy } from "./addition_things/PrivacyPolicy";
import { ReturnPolicy } from "./addition_things/ReturnPolicy";
import { TermsConditions } from "./addition_things/TermsConditions";

//User-Protected Pages
import Profile from "./profile/Profile";
import Cart from "./home_components/Cart";
import PaymentPage from './components/PaymentPage';
import ProtectedRoute from "./components/ProtectedRoute";

//Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./addition_things/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const { idToken, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (idToken && userId) {
      dispatch(fetchAndSetUserAddresses({ userId, idToken }));
    }
  }, [dispatch, idToken, userId]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <ScrollToTop />
        <Header />

        <Routes>
          {/*Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/search' element={<Search />} />
          <Route path='/category/:id' element={<Category />} />
          <Route path='/about' element={<About />} />
          <Route path='/headercategory' element={<HeaderCategory />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/return' element={<ReturnPolicy />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsConditions />} />

          {/*User Protected Routes */}
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/payment' element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
