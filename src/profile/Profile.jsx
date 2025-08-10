import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  saveProfileInfoToFirebase,
  fetchAndSetProfileInfo
} from "../firebase/firebase";
import { fetchAndSetUserOrders } from "../firebase/firebaseAddressHelpers"
import { setUserProfile } from "../redux/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId, idToken } = useSelector((state) => state.auth);
  const { userProfile, addresses, userOrders } = useSelector((state) => state.profile);

  const [editableInfo, setEditableInfo] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (userId && idToken) {
      dispatch(fetchAndSetProfileInfo({ userId, idToken }));
      dispatch(fetchAndSetUserOrders({ userId, idToken }));
    }
  }, [dispatch, userId, idToken]);

  useEffect(() => {
    setEditableInfo(userProfile);
  }, [userProfile]);

  const handleChange = (e) => {
    setEditableInfo({ ...editableInfo, [e.target.name]: e.target.value });
  };

  const handleSaveInfo = async () => {
    try {
      await saveProfileInfoToFirebase(userId, idToken, editableInfo);
      dispatch(setUserProfile(editableInfo));
      toast.success("Profile info saved successfully!");
    } catch (error) {
      toast.error("Failed to save profile info.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-16 space-y-10">
      <h1 className="text-3xl font-bold text-center text-stone-800 mb-8">Your Profile</h1>

      {/* Personal Info */}
      <div className="bg-stone-100 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-stone-700">Personal Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={editableInfo.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-stone-300 bg-stone-50 text-stone-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <input
            type="text"
            name="phone"
            value={editableInfo.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-stone-300 bg-stone-50 text-stone-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
        <button
          onClick={handleSaveInfo}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition-all"
        >
          Save Info
        </button>
      </div>

      {/* Saved Addresses */}
      <div className="bg-stone-100 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-stone-700">Saved Addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-stone-500">No saved addresses yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {addresses.map((addr) => (
              <div key={addr.id} className="border border-stone-300 p-3 rounded-md bg-stone-50 text-sm space-y-1 text-stone-800">
                <p>
                  <span className="font-medium">{addr.label}:</span> {addr.area}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p>📞 {addr.name} - {addr.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Orders */}
      <div className="bg-stone-100 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-stone-700">🛒 My Orders</h2>
        {userOrders.length === 0 ? (
          <p className="text-stone-500">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div key={order.id} className="border border-stone-300 p-4 rounded-lg bg-stone-50 text-stone-800">
                <p className="text-sm text-stone-600">Order ID: {order.id}</p>
                <p className="text-sm font-medium text-green-700">
                  Status: {order.status || "pending"}
                </p>
                <ul className="pl-5 text-sm mt-2 space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <img
                        src={item.image || item.img || "/fallback.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-stone-700">{item.name}</p>
                        <p className="text-stone-500 text-sm">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
