import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";


const CartList = ({ id, title, price, image, quantity }) => {
    const dispatch = useDispatch();

    const increment = () => {
        dispatch(updateQuantity({ id, quantity: quantity + 1 }));
        toast.success("Quantity increased");
    };

    const decrement = () => {
        if (quantity > 1) {
            dispatch(updateQuantity({ id, quantity: quantity - 1 }));
            toast.info("Quantity decreased");
        } else {
            toast.warning("Minimum quantity is 1");
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart(id));
        toast.error("Item removed");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border rounded-lg shadow-sm p-4 bg-white mb-4"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-4 items-center">
                    <img src={image} alt={title} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                        <h1 className="text-base font-medium text-gray-800">{title}</h1>
                        <p className="text-sm text-gray-500">Headphone</p>
                        <p className="text-sm text-green-600 font-semibold">₹{price}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 border border-stone-200 rounded-2xl">
                        <button onClick={decrement} className="bg-gray-100 hover:bg-gray-200 transition-colors px-2.5 py-1 rounded-l-2xl cursor-pointer">−</button>
                        <motion.span key={quantity} className="text-sm font-medium">
                            {quantity}
                        </motion.span>
                        <button onClick={increment} className="bg-gray-100 hover:bg-gray-200 transition-colors px-2.5 py-1 rounded-r-2xl cursor-pointer">+</button>
                    </div>

                    <button onClick={handleRemove} className="text-xs text-red-500 hover:underline cursor-pointer">
                        Remove
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CartList;
