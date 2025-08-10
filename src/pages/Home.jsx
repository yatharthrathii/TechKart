import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../home_components/Banner";
import HeaderCategory from "../home_components/HeaderCategory";
import Products from "../home_components/Products";
import { useDispatch } from "react-redux";
import { setCategories, setProducts } from "../redux/reduxApi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseFetchHelpers";

const Home = () => {
  const categoryRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state?.scrollToCategory && categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setCategories(categories));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProducts(products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="mt-15">
      <Banner />
      <div ref={categoryRef}>
        <HeaderCategory />
        <Products />
      </div>
    </div>
  );
};

export default Home;
