import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
} from "firebase/auth";
alert("firebase.ts loaded");
console.log("API KEY =", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("AUTH DOMAIN =", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("PROJECT ID =", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("APP ID =", import.meta.env.VITE_FIREBASE_APP_ID);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
function hasValidConfig(cfg: Record<string, any>) {
  return Boolean(cfg && cfg.apiKey && cfg.appId);
}

let app: any = null;
let auth: any = null;
let googleProvider: any = null;

if (hasValidConfig(firebaseConfig)) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (err) {
    // initialization failed (invalid API key, etc.) — fall through to dev fallback
    // keep app/auth/googleProvider as null
    // eslint-disable-next-line no-console
    console.warn("Firebase initialization failed:", err);
  }
} else {
  // No valid config found — running in local/dev without Firebase
  // eslint-disable-next-line no-console
  console.info("Firebase not configured (local/dev). Auth features disabled.");
}

export default app;

export { auth, googleProvider };

export async function signInWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error("Firebase not configured (sign-in disabled in local/dev)");
  }
  return fbSignInWithPopup(auth, googleProvider);
}

export async function sendPasswordReset(email: string) {
  if (!auth) {
    throw new Error("Firebase not configured (password reset disabled in local/dev)");
  }
  return fbSendPasswordResetEmail(auth, email);
}