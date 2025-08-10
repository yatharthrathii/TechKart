import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const fetchProducts = async () => {
    try {
        const snapshot = await getDocs(collection(db, "products"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchProductsByCategory = async (categoryName) => {
    try {
        const q = query(collection(db, "products"), where("category", "==", categoryName));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
};

export const fetchSingleProduct = async (id) => {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
        console.error("Error fetching single product:", error);
        return null;
    }
};

export const fetchCategories = async () => {
    try {
        const snapshot = await getDocs(collection(db, "categories"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const fetchCategoryById = async (categoryId) => {
    try {
        const docRef = doc(db, "categories", categoryId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        return null;
    }
};

export const fetchProductsByTitlePrefix = async (searchTerm) => {
    try {
        if (!searchTerm) return [];
        const productsRef = collection(db, "products");
        const q = query(
            productsRef,
            orderBy("title"),
            startAt(searchTerm),
            endAt(searchTerm + "\uf8ff")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching products by title prefix:", error);
        return [];
    }
};