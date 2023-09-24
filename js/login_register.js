import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-9GldTb1_2O8tDVerCUMa3IQJMfcH9XE",
  authDomain: "smart-student-projects.firebaseapp.com",
  projectId: "smart-student-projects",
  storageBucket: "smart-student-projects.appspot.com",
  messagingSenderId: "184253923545",
  appId: "1:184253923545:web:ed9f6faa54fd9bd8f23ec8",
  measurementId: "G-WY5EZLXTS8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getDatabase();

login.addEventListener("click", (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      const userRef = ref(db, "student/" + user.uid);
      console.log("User Reference:", userRef.toString());

      set(userRef, {
        name: user.displayName,
        email: user.email,
        profile_image: user.photoURL,
        college: "",
        socials: {
          Github: "",
          Linkedin: "",
          Twitter: "",
        },
      })
        .then(() => {
          console.log("Data write successful");
          window.location.href = "home.html";
          alert("Welcome" + user.displayName);
        })
        .catch((error) => {
          console.error("Error writing data:", error);
        });
    })
    .catch((error) => {
      alert(error);
    });
});

setPersistence(auth, browserSessionPersistence).catch(function (error) {
  console.log(error);
});
