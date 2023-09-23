import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  onValue,
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
const database = getDatabase(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("projectContainer");
  const database = getDatabase(app);
  const auth = getAuth(app);

  onAuthStateChanged(auth, function (user) {
    if (user) {
      const userid = user.uid;

      const projectsRef = ref(database, "student/" + userid + "/projects");

      onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();

        if (data !== null) {
          let totalLikes = 0;

          for (const projectId in data) {
            if (Object.hasOwnProperty.call(data, projectId)) {
              const projectData = data[projectId];

              const card = document.createElement("div");
              card.classList.add("card");

              card.innerHTML = `
                  <h2>${projectData.name}</h2>
                  <p>Total Likes: ${projectData.total_likes}</p>
                  <a href="${projectData.project_url}" target="_blank">Project URL</a>
                `;

              container.appendChild(card);

              // if (projectData && projectData.total_likes) {
              //   totalLikes += projectData.total_likes;

              //   console.log(projectData.total_likes);
              //   console.log(projectData.project_url);
              // }
            }
          }

          console.log("Total Likes:", totalLikes);
        }
      });
    }
  });
});
