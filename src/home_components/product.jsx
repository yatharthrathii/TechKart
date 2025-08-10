import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
    }),
};

const Product = ({ index, data }) => {

    const shouldReduceMotion = useReducedMotion();
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate("/product/" + index)}
            custom={index}
            variants={fadeUpVariant}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? false : "visible"}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden w-64 sm:w-56 md:w-60 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
        >
            <div className="overflow-hidden bg-stone-100">
                <img
                    src={data.img}
                    alt={data.title}
                    loading="lazy"
                    className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4 space-y-1">
                <h3 className="text-stone-800 font-semibold text-base">{data.title}</h3>
                <p className="text-stone-600 text-sm text-ellipsis whitespace-nowrap overflow-hidden">{data.desc}</p>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-stone-900 font-bold text-lg">{data.price}</span>
                    <span className="text-yellow-500 text-sm">⭐ 4.5</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Product;
