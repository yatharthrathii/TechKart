import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Products from "../home_components/Products";
import { setProducts } from "../redux/reduxApi";

import {
  fetchProductsByCategory,
  fetchCategoryById,
} from "../firebase/firebaseFetchHelpers";

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState("");

  const products = useSelector((state) => state.api.products);

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!id) return;

      const productsData = await fetchProductsByCategory(id);
      dispatch(setProducts(productsData));

      const categoryData = await fetchCategoryById(id);
      setCategoryTitle(categoryData?.title || "Unknown Category");
    };

    loadCategoryData();
  }, [id, dispatch]);

  return (
    <div className="mt-20">
      <div className="w-10/12 mx-auto py-5">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-700">{categoryTitle}</h1>
      </div>
      <div>
        <Products innerPage={true} products={products || []} />
      </div>
    </div>
  );
};

export default Category;
