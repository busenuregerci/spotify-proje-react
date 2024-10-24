import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import store from "./store";
import { login as handleLogin, logout as handleLogout } from "./store/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoUV4g9T4ZyQFsEnP8It8Yz0vrquzqCGU",
  authDomain: "spotify-react-project-883f8.firebaseapp.com",
  projectId: "spotify-react-project-883f8",
  storageBucket: "spotify-react-project-883f8.appspot.com",
  messagingSenderId: "363512019890",
  appId: "1:363512019890:web:52ed4463518c731eadc2ab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async (email, password, displayName) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        await updateProfile(user, { displayName });

        // Sadece dizilebilen kullanıcı verilerini Redux'a kaydedin
        const serializedUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        };

        store.dispatch(handleLogin(serializedUser));

        return user;
    } catch (error) {
        toast.error(error.message);
    }
}

export const login = async (email, password) => {
    try {
       const { user } = await signInWithEmailAndPassword(auth, email, password);

       // Sadece dizilebilen kullanıcı verilerini Redux'a kaydedin
       const serializedUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
       };

       store.dispatch(handleLogin(serializedUser));

       return user;
    } catch (error) {
        console.error("Login failed:", error); 
        Swal.fire({
          title: "Oooppsss!! E-mail or password wrong!",
          showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`
          },
          hideClass: {
            popup: `animate__animated animate__fadeOutDown animate__faster`
          }
        });
    }
}

export const logout = async () => {
    try {
       await signOut(auth);
       store.dispatch(handleLogout());
       return true;
    } catch (error) {
        toast.error(error.message);
    }
}

// Firebase kullanıcı durumu değiştikçe redux'a kaydediyoruz
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Sadece dizilebilen kullanıcı verilerini Redux'a kaydedin
        const serializedUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        };

        store.dispatch(handleLogin(serializedUser));
    } else {
        store.dispatch(handleLogout());
    }
});
