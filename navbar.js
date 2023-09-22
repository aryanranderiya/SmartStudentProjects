import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
const user = auth.currentUser;

onAuthStateChanged(auth, function (user) {
  console.log("Auth state changed:", user);

  if (user) {
    document.getElementById("menu_logout").style.display = "block";
    document.getElementById("menu_profile").style.display = "block";
    document.getElementById("menu_loginregister").style.display = "none";
    document.getElementById("menu_submit_project").style.display = "block";

    const profileLink = document.getElementById("menu_profile");
    profileLink.innerHTML = `
      <i class="fa-solid fa-user"></i>
        ${user.displayName}'s Profile`;

    console.log(user.displayName + "is logged in!");
  } else {
    document.getElementById("menu_logout").style.display = "none";
    document.getElementById("menu_profile").style.display = "none";
    document.getElementById("menu_submit_project").style.display = "none";
    document.getElementById("menu_loginregister").style.display = "block";
  }
});

document.getElementById("menu_logout").addEventListener("click", function () {
  if (confirm("Are you sure you want to Logout?")) {
    signOut(auth)
      .then(() => {
        console.log("Successfully logged out!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
