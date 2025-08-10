import { useState, useEffect } from "react";
import Products from "../home_components/Products";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseFetchHelpers";

const RelatedProducts = ({ productId, categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!productId || !categoryId) return;

    const fetchRelatedProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", categoryId),
          where("__name__", "!=", productId) 
        );

        const snapshot = await getDocs(q);

        const filteredProducts = snapshot.docs
          .filter(doc => doc.id !== productId)
          .slice(0, 4) 
          .map(doc => ({ id: doc.id, ...doc.data() }));

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [productId, categoryId]);

  if (!relatedProducts.length) return null;

  return (
    <div>
      <Products innerPage={true} products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;
