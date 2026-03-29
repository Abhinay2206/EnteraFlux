import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent, type Analytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, writeBatch } from 'firebase/firestore';
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

/**
 * Fetch all feedback entries, newest first.
 */
export async function fetchFeedback() {
    const q = query(collection(db, 'feedback'), orderBy('submitted_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Delete a feedback entry by document ID.
 */
export async function deleteFeedbackEntry(docId: string): Promise<boolean> {
    try {
        await deleteDoc(doc(db, 'feedback', docId));
        return true;
    } catch (error) {
        console.error('Error deleting feedback:', error);
        return false;
    }
}

/**
 * Fetch all R&D applications, newest first.
 */
export async function fetchRDApplications() {
    const q = query(collection(db, 'rd_applications'), orderBy('submitted_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Delete an R&D application by document ID.
 */
export async function deleteRDApplication(docId: string): Promise<boolean> {
    try {
        await deleteDoc(doc(db, 'rd_applications', docId));
        return true;
    } catch (error) {
        console.error('Error deleting R&D application:', error);
        return false;
    }
}

/**
 * Fetch all FAERS Semaglutide adverse event records.
 */
export async function fetchFaersData() {
    const snapshot = await getDocs(collection(db, 'faers_semaglutide'));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch all GLP-1 clinical trial records.
 */
export async function fetchGlp1Trials() {
    const snapshot = await getDocs(collection(db, 'glp1_trials'));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Batch-add records to a Firestore collection. Splits into 500-doc batches (Firestore limit).
 */
export async function addRecordsBatch(collectionName: string, records: Record<string, unknown>[]) {
    const BATCH_SIZE = 500;
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = records.slice(i, i + BATCH_SIZE);
        for (const record of chunk) {
            const ref = doc(collection(db, collectionName));
            batch.set(ref, { ...record, uploaded_at: new Date().toISOString() });
        }
        await batch.commit();
    }
}

export { app, analytics, db, auth, onAuthStateChanged, type User };
