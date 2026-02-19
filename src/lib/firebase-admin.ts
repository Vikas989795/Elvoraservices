import admin from 'firebase-admin';

// Ensure the environment variables are not undefined. 
// Provide default empty strings if they are not set.
const projectId = process.env.FIREBASE_PROJECT_ID || '';
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || '';
// In Vercel, the private key is stored with escaped newlines.
// We need to replace them back to actual newline characters.
const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

const serviceAccount = {
  projectId,
  clientEmail,
  privateKey,
};

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export const db = admin.firestore();
export { admin };
