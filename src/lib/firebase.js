import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, query, where, doc, setDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAxcz9BPasvBJVPkXORYAoAiVbwwMJoe8A',
	authDomain: 'stray-catty.firebaseapp.com',
	projectId: 'stray-catty',
	storageBucket: 'stray-catty.appspot.com',
	messagingSenderId: '616490287053',
	appId: '1:616490287053:web:3bd43053e8488eeee9ce84',
	measurementId: 'G-X34GZ5V0EH'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const handleSignOut = () => auth.signOut();
export const handleSignInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		// Handle successful sign-in here
		console.log('Signed in with Google:', result.user);

		// update profile
		const { displayName, email, photoURL } = result.user;
		const docRef = doc(db, 'profiles', result.user.uid);
		await setDoc(docRef, {
			displayName,
			email,
			photoURL,
			uid: result.user.uid
		});
	} catch (error) {
		// Handle sign-in error here
		console.error('Error signing in with Google:', error);
	}
};
