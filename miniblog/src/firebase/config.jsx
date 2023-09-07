// import { getFirestore } from 'firebase/firebase';
import { getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBh2uNJW7S7UHZQCzSoOHy8sMGhNTjk3B8',
  authDomain: 'miniblog-ae315.firebaseapp.com',
  projectId: 'miniblog-ae315',
  storageBucket: 'miniblog-ae315.appspot.com',
  messagingSenderId: '229361077089',
  appId: '1:229361077089:web:c75d5f15ea734209c79320',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
