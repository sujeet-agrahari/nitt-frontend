// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "nitti-f2ae2.firebaseapp.com",
  projectId: "nitti-f2ae2",
  storageBucket: "nitti-f2ae2.appspot.com",
  messagingSenderId: "279574384588",
  appId: "1:279574384588:web:552ef648b2789d6c6a9769",
  measurementId: "G-JJPV9RVQ0B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const getResult = async (query) => {
  const querySnapshot = await getDocs(query);
  const result = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    result.push({ id: doc.id, ...doc.data() });
  });
  return result;
};

export const uploadFile = async (file, key) => {
  const storageRef = ref(
    storage,
    file.name.split(".").slice(0, -1).join(".") + key
  );
  const snapshotp = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshotp.ref);
};

export const getDocuments = async ({
  collectionName,
  whereConditions = {},
  fetchSingle = false,
}) => {
  const whereQuery = Object.entries(whereConditions).map(([key, value]) => {
    if (key === "id") {
      return where(documentId(), "==", value);
    }
    return where(key, "==", value);
  });
  const q = query(collection(db, collectionName), ...whereQuery);
  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    result.push({ id: doc.id, ...doc.data() });
  });
  return fetchSingle ? result[0] : result;
};

export const addDocument = async ({ collectionName, fields }) => {
  const docRef = await addDoc(collection(db, collectionName), {
    createdAt: new Date(),
    updatedAt: new Date(),
    ...fields,
  });
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
