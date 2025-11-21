import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
const serviceAccount = require("../gymServiceAccountKey.json");

// Initialize the Firebase app with the service account credentials
initializeApp({
    credential: cert(serviceAccount),
});

// Get a reference to Firestore
const db: Firestore = getFirestore();
const auth: Auth = getAuth();

export { db, auth };