import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Banknote, Smartphone, Wallet, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { saveOrderToFirebase } from "../firebase/firebaseAddressHelpers";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { totalAmount } = location.state || {};

    const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedUPI, setSelectedUPI] = useState("");

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { userId, idToken } = useSelector((state) => state.auth);

    const handlePlaceOrder = async () => {
        if (!selectedMethod) {
            toast.warning("Please select a payment method before placing order");
            return;
        }

        try {
            await saveOrderToFirebase(userId, idToken, {
                amount: totalAmount,
                method: selectedMethod,
                items: cartItems,
                createdAt: new Date().toISOString(),
            });

            dispatch(clearCart());
            toast.success("Your order has been placed successfully!");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            console.error("Failed to save order:", err);
            toast.error("Order failed. Please try again.");
        }
    };

    const methodBox = "border rounded-lg px-4 py-3 cursor-pointer hover:shadow transition-all bg-stone-100 text-stone-800";

    return (
        <div className="px-5">
            <div className="max-w-3xl mx-auto mt-24 mb-10 p-5 bg-stone-50 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center text-stone-800">Payment Option</h1>
                <p className="text-xl font-semibold mb-6 text-center text-stone-700">Total Amount: ₹{totalAmount}</p>

                <div className="space-y-6">
                    <label className="font-medium text-stone-700 text-lg">Select Payment Method:</label>

                    <div className="space-y-4">
                        {/* UPI */}
                        <div className={methodBox + (selectedMethod === "upi" ? " ring-2 ring-stone-600" : "")}
                            onClick={() => setSelectedMethod("upi")}>
                            <div className="flex items-center gap-3"><Smartphone size={20} /> UPI</div>
                            {selectedMethod === "upi" && (
                                <div className="ml-6 mt-3 space-y-2">
                                    <p className="text-stone-700 font-medium">Choose UPI Option:</p>
                                    {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                                        <div key={app}>
                                            <input type="radio" name="upiOption" id={app} value={app} onChange={(e) => setSelectedUPI(e.target.value)} className="mr-2" />
                                            <label htmlFor={app}>{app}</label>
                                        </div>
                                    ))}
                                    <div>
                                        <input type="radio" name="upiOption" id="addNew" value="new" onChange={() => setSelectedUPI("new")} className="mr-2" />
                                        <label htmlFor="addNew">Add New UPI ID</label>
                                    </div>
                                    {selectedUPI === "new" && <input type="text" placeholder="Enter UPI ID" className="border border-stone-300 p-2 rounded w-full mt-2" />}
                                </div>
                            )}
                        </div>

                        {/* Card */}
                        <div className={methodBox + (selectedMethod === "card" ? " ring-2 ring-stone-600" : "")}
                            onClick={() => setSelectedMethod("card")}>
                            <div className="flex items-center gap-3"><CreditCard size={20} /> Credit / Debit / ATM Card</div>
                            {selectedMethod === "card" && (
                                <div className="ml-6 mt-3 space-y-2">
                                    <input type="text" placeholder="Card Number" className="border border-stone-300 p-2 rounded w-full" />
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="MM/YY" className="border border-stone-300 p-2 rounded w-1/2" />
                                        <input type="text" placeholder="CVV" className="border border-stone-300 p-2 rounded w-1/2" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Net Banking */}
                        <div className={methodBox + (selectedMethod === "netbanking" ? " ring-2 ring-stone-600" : "")}
                            onClick={() => setSelectedMethod("netbanking")}>
                            <div className="flex items-center gap-3"><Banknote size={20} /> Net Banking</div>
                            {selectedMethod === "netbanking" && (
                                <div className="ml-6 mt-3">
                                    <input type="text" placeholder="Enter Bank Name" className="border border-stone-300 p-2 rounded w-full" />
                                </div>
                            )}
                        </div>

                        {/* E-commerce Card */}
                        <div className={methodBox + (selectedMethod === "ecomcard" ? " ring-2 ring-stone-600" : "")}
                            onClick={() => setSelectedMethod("ecomcard")}>
                            <div className="flex items-center gap-3"><Wallet size={20} /> E-commerce Card</div>
                            {selectedMethod === "ecomcard" && (
                                <div className="ml-6 mt-3">
                                    <input type="text" placeholder="Enter E-commerce Card Number" className="border border-stone-300 p-2 rounded w-full" />
                                </div>
                            )}
                        </div>

                        {/* COD */}
                        <div className={methodBox + (selectedMethod === "cod" ? " ring-2 ring-stone-600" : "")}
                            onClick={() => setSelectedMethod("cod")}>
                            <div className="flex items-center gap-3"><Truck size={20} /> Cash on Delivery</div>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className={`mt-6 w-full cursor-pointer py-3 rounded-lg text-white font-bold transition 
                            ${selectedMethod ? 'bg-stone-700 hover:bg-stone-800' : 'bg-stone-500 hover:bg-stone-600'}`}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
