import { initializeApp } from 'firebase/app';
import {
    getAuth, signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

import {
    getFirestore,
    doc, // gets document instace
    getDoc, //get documents data
    setDoc //set documents data
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMe_RzNxrbO6iMLsTlb8UN_t3GCkl1yys",
    authDomain: "crwn-clothing-db-8a5e3.firebaseapp.com",
    projectId: "crwn-clothing-db-8a5e3",
    storageBucket: "crwn-clothing-db-8a5e3.appspot.com",
    messagingSenderId: "465974003211",
    appId: "1:465974003211:web:9b7ae8793aad1f4056290e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

//takes response from Google Signin and store in firestore
export const createUserDocumentFromAuth = async (userAuth) => {
    
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
    
    //check whether the user exiats in DB,
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) 
    {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error){
         console.log("Error creating User",error.message)   
        }
    }
    return userDocRef;

    //if user data exists

    //if the  user detail exist if it exists

    //if user data does not exist, create/set the db entry
}

