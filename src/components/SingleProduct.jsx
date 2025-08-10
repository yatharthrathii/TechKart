import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import { toast } from "sonner";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../firebase/firebaseFetchHelpers";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idToken } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const prodData = await fetchSingleProduct(id);
      if (prodData) setProduct(prodData);
      else toast.error("Product not found");
    };
    getProduct();
  }, [id]);

  const increment = () => {
    setQuantity((prev) => prev + 1);
    toast.info("Increased quantity");
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      toast.info("Decreased quantity");
    } else {
      toast.error("Quantity must be at least 1");
    }
  };

  const handleAddToCart = (product, quantity) => {
    if (!idToken) {
      toast.warning("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image: product.img ? product.img : "/fallback.jpg",
    };

    dispatch(addToCart(item));
    setQuantity(1);
    toast.success(`${product?.title || "Product"} added to cart (${quantity})`);
  };

  console.log(product)

  if (!product) return <p>Loading product details...</p>;

  return (
    <section className="mt-30 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start mt-10">
          {/* Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="w-full lg:w-1/2"
          >
            <img
              className="w-full max-w-md mx-auto"
              src={product.img && product.img.length > 0 ? product.img : "/fallback.jpg"}
              alt={product.title || "Product"}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
            className="w-full lg:w-1/2 space-y-5"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">
              {product.title}
            </h1>

            <h2 className="text-lg sm:text-xl font-semibold text-stone-600">
              ₹{product.price}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {product.desc}
            </p>

            {/* Quantity + Cart */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                <button
                  onClick={decrement}
                  className="bg-stone-100 px-3 py-1.5 text-lg text-stone-700 hover:bg-stone-200 transition"
                >
                  −
                </button>
                <span className="px-4 py-1.5 text-sm font-medium text-stone-800 bg-white select-none min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={increment}
                  className="bg-stone-100 px-3 py-1.5 text-lg text-stone-700 hover:bg-stone-200 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product, quantity)}
                className="flex items-center gap-2 px-5 py-2 rounded text-sm transition-all shadow-md bg-stone-800 text-white hover:bg-stone-700 cursor-pointer"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>

            {/* Category */}
            <div className="pt-2">
              <span className="text-sm text-stone-500">
                Category:{" "}
                <span className="text-stone-700">
                  Headphone

                </span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-14"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-6">
            Related Products
          </h2>
          <RelatedProducts
            productId={product.id}
            categoryId={product.category}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SingleProduct;
