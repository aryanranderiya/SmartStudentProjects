import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
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

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("projectContainer");

  const projectsRef = ref(database, "Projects/");

  onValue(projectsRef, (snapshot) => {
    const data = snapshot.val();

    if (data !== null) {
      for (const projectId in data) {
        const projectData = data[projectId];

        if (projectData && projectData.p_name) {
          const card = document.createElement("div");
          card.classList.add("card");
          card.id = `project-card`;

          card.innerHTML = `
          <h2>${projectData.p_name}</h2>
          <p>
          Description: ${projectData.p_description}<br>
          Type: ${projectData.p_type}<br>
          User ID: ${projectData.p_user_id}<br>
          <i class="fa-solid fa-thumbs-up fa-xl"></i> Likes: ${projectData.p_likes}<br>
          <a href="${projectData.file_storage_reference}" target="_blank">View File</a></p>
        `;

          container.appendChild(card);
        }
      }
    }
  });
});
