 import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyA_iYY1cpnwjW4idgEmpVScj3SecxN2Qss",
  authDomain: "todolistwebapp-eb8cb.firebaseapp.com",
  projectId: "todolistwebapp-eb8cb",
  appId: "1:869793857380:web:79b4a200e73bae6c088471",
};

 const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

 function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

 function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

 window.signUp = signUp;
window.login = login;
auth.onAuthStateChanged(user => {
  if (user) {
      profileNameElement.textContent = user.displayName || "No Name";
      profilePictureElement.src = user.photoURL || "images/default-avatar.png";   
  } else {
      profileNameElement.textContent = "Guest";
      profilePictureElement.src = "images/default-avatar.png";   
  }
});
