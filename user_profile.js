import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
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
const database = getDatabase();

onAuthStateChanged(auth, function (user) {
  console.log("Auth state changed:", user);

  if (user) {
    var name = user.displayName;
    var email = user.email;
    var photoURL = user.photoURL;
    var userImage = document.getElementById("user_image");
    userImage.src = photoURL;
    document.getElementById("user_name").textContent = name;
    document.getElementById("user_name2").textContent = name;

    document.getElementById("contact_email").textContent = email;
    document.getElementById("user_email").textContent = email;
    document.getElementById("user_email2").textContent = email;

    const btn_close = document.getElementById("btn_close");
    const editprofile = document.getElementById("editprofile");
    const closeButton = document.getElementById("closeButton");
    const edit_profile_submit = document.getElementById("edit_profile_submit");

    editprofile.addEventListener("click", openModal);
    btn_close.addEventListener("click", closeModal);
    closeButton.addEventListener("click", closeModal);

    edit_profile_submit.addEventListener("click", function () {
      submitProfileEdit(user.uid);
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
});

const modal = document.getElementById("myModal");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function submitProfileEdit(userid) {
  const linkedinInput = document.getElementById("edit_linkedin");
  const githubInput = document.getElementById("edit_github");
  const twitterInput = document.getElementById("edit_twitter");

  var user_linkedin = linkedinInput.value;
  var user_github = githubInput.value;
  var user_twitter = twitterInput.value;

  const dbref = ref(database, "student/" + userid + "/socials");

  set(ref(database, "student/" + userid + "/socials"), {
    LinkedIn: user_linkedin,
    Github: user_github,
    Twitter: user_twitter,
  })
    .then(() => {
      console.log("Socials data updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating LinkedIn data:", error);
    });

  closeModal();

  // get(child(linkedRef, `LinkedIn_username`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // get(child(githubRef, `Github_username`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}
