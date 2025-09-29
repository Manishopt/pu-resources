import firebase from 'firebase/app';
import 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl2WcRJjbJScX64AP7xxiYjWq2CFqIfHA",
  authDomain: "pu-resources-c539f.firebaseapp.com",
  projectId: "pu-resources-c539f",
  storageBucket: "pu-resources-c539f.firebasestorage.app",
  messagingSenderId: "344304307370",
  appId: "1:344304307370:web:66264caccb197d4de9d4d3",
  measurementId: "G-VMMXKJYRCR"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Analytics (only in production)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = firebase.analytics();
}

export default app;
export { analytics };
