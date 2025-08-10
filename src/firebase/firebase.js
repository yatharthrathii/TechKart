import { setAddresses, setUserProfile } from "../redux/profileSlice";

const FIREBASE_URL = import.meta.env.VITE_FIREBASE_DB_URL;

export const saveAddressToFirebase = async (userId, idToken, addressData) => {
  const res = await fetch(`${FIREBASE_URL}/users/${userId}/addresses.json?auth=${idToken}`, {
    method: "POST",
    body: JSON.stringify(addressData),
  });
  return await res.json();
};

export const updateAddressInFirebase = async (userId, idToken, addressData) => {
  await fetch(`${FIREBASE_URL}/users/${userId}/addresses/${addressData.id}.json?auth=${idToken}`, {
    method: "PUT",
    body: JSON.stringify(addressData),
  });
};


export const deleteAddressFromFirebase = async (userId, idToken, addressId) => {
  await fetch(`${FIREBASE_URL}/users/${userId}/addresses/${addressId}.json?auth=${idToken}`, {
    method: "DELETE"
  });
};


export const fetchAndSetUserAddresses = ({ userId, idToken }) => async (dispatch) => {
  try {
    const res = await fetch(`${FIREBASE_URL}/users/${userId}/addresses.json?auth=${idToken}`);
    const data = await res.json();

    if (data) {
      const addresses = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      dispatch(setAddresses(addresses));
    } else {
      dispatch(setAddresses([]));
    }
  } catch (err) {
    console.error("Failed to fetch addresses", err);
  }
};


export const saveProfileInfoToFirebase = async (userId, idToken, profileData) => {
  const res = await fetch(`${FIREBASE_URL}/users/${userId}/profile.json?auth=${idToken}`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error("Failed to save profile info");
};


export const fetchAndSetProfileInfo = ({ userId, idToken }) => async (dispatch) => {
  try {
    const res = await fetch(`${FIREBASE_URL}/users/${userId}/profile.json?auth=${idToken}`);
    const data = await res.json();
    if (data) dispatch(setUserProfile(data));
  } catch (err) {
    console.error("Failed to fetch profile info", err);
  }
};
