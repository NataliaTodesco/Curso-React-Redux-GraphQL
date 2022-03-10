import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setDoc,doc,getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWRMfL5H0ZSQsnD3BvCZAlfbvpa1QeAB0",
  authDomain: "rick-y-morty-8bb15.firebaseapp.com",
  projectId: "rick-y-morty-8bb15",
  storageBucket: "rick-y-morty-8bb15.appspot.com",
  messagingSenderId: "695943087393",
  appId: "1:695943087393:web:838ae456abe49ad2fcaa60",
  measurementId: "G-JVHFBT4K9Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {analytics}

const auth = getAuth();

export function signOutGoogle() {
  auth.signOut();
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user
    })
    .catch((error) => {
      return error.message
    });
}

const db = getFirestore(); 

export function addFavorites(array, uid) {
  try {
    return setDoc(doc(db, "favs", uid), {
      array
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getFavorites(uid) {
    const docRef = doc(db, "favs", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().array;
    } else {
      return [];
    }
}


