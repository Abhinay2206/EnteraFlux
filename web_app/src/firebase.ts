import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent, type Analytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID',
};

const app = initializeApp(firebaseConfig);

// Analytics
let analytics: Analytics | null = null;
try {
    analytics = getAnalytics(app);
} catch {
    console.warn('Firebase Analytics not available.');
}

// Firestore
const db = getFirestore(app);

// Auth
const auth = getAuth(app);

/**
 * Save survey response to Firestore.
 */
export async function submitSurveyResponse(data: Record<string, unknown>): Promise<boolean> {
    try {
        const docRef = await addDoc(collection(db, 'survey_responses'), {
            ...data,
            submitted_at: new Date().toISOString(),
        });
        console.log('Survey response saved with ID:', docRef.id);
        if (analytics) {
            firebaseLogEvent(analytics, 'survey_submitted', { submission_id: docRef.id });
        }
        return true;
    } catch (error) {
        console.error('Error saving survey response:', error);
        return false;
    }
}

/**
 * Fetch all survey responses, ordered by submission time (newest first).
 */
export async function fetchSurveyResponses() {
    const q = query(collection(db, 'survey_responses'), orderBy('submitted_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Delete a survey response by document ID.
 */
export async function deleteSurveyResponse(docId: string): Promise<boolean> {
    try {
        await deleteDoc(doc(db, 'survey_responses', docId));
        return true;
    } catch (error) {
        console.error('Error deleting response:', error);
        return false;
    }
}

// Auth helpers
export async function adminLogin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function adminLogout() {
    return signOut(auth);
}

/**
 * Submit feedback (patient or developer) to Firestore.
 */
export async function submitFeedback(data: Record<string, unknown>): Promise<boolean> {
    try {
        const docRef = await addDoc(collection(db, 'feedback'), {
            ...data,
            submitted_at: new Date().toISOString(),
        });
        console.log('Feedback saved with ID:', docRef.id);
        if (analytics) {
            firebaseLogEvent(analytics, 'feedback_submitted', { feedback_id: docRef.id, role: String(data.role || '') });
        }
        return true;
    } catch (error) {
        console.error('Error saving feedback:', error);
        return false;
    }
}

/**
 * Submit R&D interest application to Firestore.
 */
export async function submitRDInterest(data: Record<string, unknown>): Promise<boolean> {
    try {
        const docRef = await addDoc(collection(db, 'rd_applications'), {
            ...data,
            submitted_at: new Date().toISOString(),
        });
        console.log('R&D application saved with ID:', docRef.id);
        if (analytics) {
            firebaseLogEvent(analytics, 'rd_application_submitted', { application_id: docRef.id });
        }
        return true;
    } catch (error) {
        console.error('Error saving R&D application:', error);
        return false;
    }
}

export { app, analytics, db, auth, onAuthStateChanged, type User };
