import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const HeaderCategory = () => {
  const safeCategories = useSelector(state => state.api.categories);
  const categories = safeCategories || [];

  return (
    <div className="w-11/12 mx-auto mt-10 mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-stone-800">
        Explore Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <Link to={`/category/${cat.id}`} key={cat.id}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="h-60 w-70 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="py-2 text-center text-stone-700 font-medium text-sm sm:text-base">
                {cat.title}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderCategory;
