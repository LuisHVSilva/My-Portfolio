// Firebase Functions
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Sensitive Datas
import { FIREBASE } from "./sensitiveData/config";

// Initialize Firebase
const app = initializeApp(FIREBASE);
const storage = getStorage(app);

export { storage };

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries