import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    deleteAddressLocal,
    selectAddress,
    updateAddressLocal,
    addAddressLocal,
} from "../redux/profileSlice";
import {
    saveAddressToFirebase,
    updateAddressInFirebase,
    deleteAddressFromFirebase,
} from "../firebase/firebaseAddressHelpers";

import {
    Trash2,
    Edit3,
} from "lucide-react";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, cartCount, cartSubTotal } = useSelector((state) => state.cart);
    const { addresses, selectedAddress } = useSelector((state) => state.profile);
    const { userId, idToken } = useSelector((state) => state.auth);

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "", phone: "", area: "", city: "", state: "", pincode: "", label: "Home"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = async () => {
        const allFilled = Object.values(formData).every((val) => val.trim() !== "");
        if (!allFilled) return toast.warning("Please fill all address fields.");

        try {
            if (formData.id) {
                await updateAddressInFirebase(userId, idToken, formData);
                dispatch(updateAddressLocal(formData));
                toast.success("Address updated!");
            } else {
                const res = await saveAddressToFirebase(userId, idToken, formData);
                dispatch(addAddressLocal({ ...formData, id: res.name }));
                toast.success("Address added!");
            }

            setFormData({ name: "", phone: "", area: "", city: "", state: "", pincode: "", label: "Home" });
            setShowAddressForm(false);
        } catch (error) {
            toast.error("Error saving address to database.");
            console.log(error)
        }
    };

    const handleDeleteAddress = async (addrId) => {
        try {
            await deleteAddressFromFirebase(userId, idToken, addrId);
            dispatch(deleteAddressLocal(addrId));
            toast.info("Address deleted!");
        } catch (err) {
            toast.error("Failed to delete address.");
            console.log(err)
        }
    };

    const handleBuyNow = () => {
        if (!selectedAddress) {
            toast.warning("Select address before proceeding!");
            return;
        }

        navigate("/payment", {
            state: {
                totalAmount: cartSubTotal,
                cartItems,
                selectedAddress,
            },
        });
    };

    return (
        <div className="mt-20 w-11/12 mx-auto mb-10">
            <h1 className="text-3xl font-bold mt-8 mb-8 text-center">🛒 Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 w-full">
                    <h2 className="text-xl font-semibold mb-4">Items in Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            <h2 className="text-xl font-semibold">Your Cart is Empty 🛒</h2>
                            <p className="text-sm mt-2">Add some items to see them here.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => <CartList key={item.id} {...item} />)
                    )}
                </div>

                <div className="lg:w-1/3 w-full bg-white rounded-xl shadow-md p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">🧾 Order Summary</h2>
                        <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
                            <span>Total Items</span><span>{cartCount}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 border-b py-2">
                            <span>Delivery</span><span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2">
                            <span>Total</span><span>₹{cartSubTotal}</span>
                        </div>
                    </div>

                    {showAddressForm && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                            <h2 className="font-semibold">Add Delivery Address</h2>
                            {["name", "phone", "area", "city", "state", "pincode"].map(field => (
                                <input key={field} type="text" name={field} value={formData[field]} onChange={handleChange}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full border p-2 rounded" />
                            ))}
                            <select name="label" value={formData.label} onChange={handleChange} className="w-full border p-2 rounded">
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Other">Other</option>
                            </select>
                            <button onClick={handleAddOrUpdate} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer">
                                Save Address
                            </button>
                        </motion.div>
                    )}

                    <button onClick={() => setShowAddressForm(prev => !prev)} className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg transition cursor-pointer">
                        {showAddressForm ? "Cancel Address" : "Add Address"}
                    </button>

                    {addresses.map((addr) => (
                        <div key={addr.id} className="border p-3 rounded-md bg-gray-50 text-sm space-y-1 mt-3">
                            <p><span className="font-medium">{addr.label}:</span> {addr.area}, {addr.city}, {addr.state} - {addr.pincode}</p>
                            <p>📞 {addr.name} - {addr.phone}</p>

                            {selectedAddress?.id !== addr.id && (
                                <button onClick={() => {
                                    dispatch(selectAddress(addr));
                                    toast.success("Address selected!");
                                }} className="mt-2 w-full bg-green-100 hover:bg-green-200 text-green-700 py-1.5 rounded cursor-pointer">
                                    Select this Address
                                </button>
                            )}

                            <button onClick={() => {
                                setFormData({ ...addr });
                                setShowAddressForm(true);
                            }} className="mt-2 w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-1.5 rounded flex justify-center items-center gap-1 cursor-pointer">
                                <Edit3 size={14} /> <span>Edit</span>
                            </button>

                            <button onClick={() => handleDeleteAddress(addr.id)} className="mt-2 w-full bg-red-100 hover:bg-red-200 text-red-600 py-1.5 rounded flex justify-center items-center gap-1 cursor-pointer">
                                <Trash2 size={14} /> <span>Delete</span>
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition cursor-pointer"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
