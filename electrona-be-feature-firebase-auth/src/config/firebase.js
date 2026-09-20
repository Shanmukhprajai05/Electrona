import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(
    path.join(
      __dirname,
      "../../firebase/electrona-be-firebase-adminsdk-fbsvc-da260df2c9.json"
    ),
    "utf8"
  )
);

const firebaseProjectId = serviceAccount.project_id;
const envProjectId = process.env.FIREBASE_PROJECT_ID;

if (!process.env.FIREBASE_API_KEY) {
  console.warn(
    "FIREBASE_API_KEY is not set. Firebase REST auth requests will fail with invalid API key."
  );
}

if (envProjectId && envProjectId !== firebaseProjectId) {
  console.warn(
    `Firebase project ID mismatch: .env FIREBASE_PROJECT_ID=${envProjectId} vs service account project_id=${firebaseProjectId}`
  );
}

console.log(`Firebase Admin initialized for project: ${firebaseProjectId}`);

initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth();
