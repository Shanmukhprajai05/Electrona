import axios from "axios";
import { auth } from "../config/firebase.js";
import pool from "../config/db.js";

const firebaseApiKey = process.env.FIREBASE_API_KEY;

if (!firebaseApiKey) {
  const error = new Error(
    "Missing FIREBASE_API_KEY in backend environment. Set it to the Web API key for the Firebase project."
  );
  console.error(error.message);
  throw error;
}

export const registerUser = async (email, password) => {
  // Create user in Firebase
  const user = await auth.createUser({
    email,
    password,
  });

  // Save user in PostgreSQL
  await pool.query(
    `
    INSERT INTO users (firebase_uid, email)
    VALUES ($1, $2)
    ON CONFLICT (email) DO NOTHING
    `,
    [user.uid, user.email]
  );

  return user;
};

export const loginUser = async (email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;

  try {
    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    return response.data;
  } catch (error) {
    console.error("Firebase REST auth login failed", {
      url,
      apiKeyPresent: !!firebaseApiKey,
      status: error.response?.status,
      responseData: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

// Forgot Password
export const sendPasswordReset = async (email) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`;

  try {
    const response = await axios.post(url, {
      requestType: "PASSWORD_RESET",
      email: email,
    });

    return response.data;
  } catch (error) {
    console.error("Firebase REST auth password reset failed", {
      url,
      apiKeyPresent: !!firebaseApiKey,
      status: error.response?.status,
      responseData: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};
