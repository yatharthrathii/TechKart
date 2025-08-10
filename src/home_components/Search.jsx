import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchProductsByTitlePrefix } from "../firebase/firebaseFetchHelpers";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearchInput = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setProducts([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      const results = await fetchProductsByTitlePrefix(searchTerm.trim());
      setProducts(results);
      setLoading(false);
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleProductClick = (id) => navigate(`/product/${id}`);

  return (
    <div className="mt-20 px-4 mb-10">
      <div className="max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search for Products or Categories..."
          value={searchTerm}
          onChange={handleSearchInput}
          className="w-full p-3 rounded-lg border shadow-sm text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-stone-400 text-center"
        />
      </div>

      <div className="max-w-3xl mx-auto mt-10 space-y-4">
        {loading ? (
          <p className="text-center text-stone-500 text-sm">Searching...</p>
        ) : products.length > 0 ? (
          products.map(({ id, title, desc, img }) => {
            const imageUrl = img || "/fallback.jpg";

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                onClick={() => handleProductClick(id)}
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h1 className="text-lg font-semibold text-stone-800">{title}</h1>
                  <p className="text-sm text-stone-500 line-clamp-2">{desc}</p>
                </div>
              </motion.div>
            );
          })
        ) : searchTerm.trim().length > 0 ? (
          <p className="text-center text-stone-500 text-sm">No matching products or categories found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
