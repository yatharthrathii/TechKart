const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

import { setAllAddresses, setUserOrders } from "../redux/profileSlice";

export const saveAddressToFirebase = async (userId, idToken, address) => {
  const res = await fetch(`${DB_URL}/addresses/${userId}.json?auth=${idToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...address, createdAt: new Date().toISOString() }),
  });
  return res.json();
};

export const getAddressesFromFirebase = async (userId, idToken) => {
  const res = await fetch(`${DB_URL}/addresses/${userId}.json?auth=${idToken}`);
  const data = await res.json();

  if (!data || data.error) return [];

  return Object.entries(data).map(([id, val]) => ({ id, ...val }));
};

export const deleteAddressFromFirebase = async (userId, idToken, firebaseId) => {
  await fetch(`${DB_URL}/addresses/${userId}/${firebaseId}.json?auth=${idToken}`, {
    method: "DELETE"
  });
};

export const updateAddressInFirebase = async (userId, idToken, address) => {
  const { id, ...rest } = address;
  await fetch(`${DB_URL}/addresses/${userId}/${id}.json?auth=${idToken}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
  });
};


export const fetchAndSetUserAddresses = ({ userId, idToken }) => async (dispatch) => {
  try {
    const addresses = await getAddressesFromFirebase(userId, idToken);
    dispatch(setAllAddresses(addresses));
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
  }
};

export const saveOrderToFirebase = async (userId, idToken, orderData) => {
  const res = await fetch(`${DB_URL}/orders/${userId}.json?auth=${idToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error("Order failed to save.");
  return await res.json();
};

export const getOrdersFromFirebase = async (userId, idToken) => {
  const res = await fetch(`${DB_URL}/orders/${userId}.json?auth=${idToken}`);
  const data = await res.json();
  if (!data || data.error) return [];

  return Object.entries(data).map(([id, val]) => ({ id, ...val }));
};

export const fetchAndSetUserOrders = ({ userId, idToken }) => async (dispatch) => {
  try {
    const orders = await getOrdersFromFirebase(userId, idToken);
    dispatch(setUserOrders(orders));
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }
};