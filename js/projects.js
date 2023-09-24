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
  const container = document.querySelector(".pcontainer");

  const projectsRef = ref(database, "Projects/");

  onValue(projectsRef, (snapshot) => {
    const data = snapshot.val();

    if (data !== null) {
      let cardCount = 0;
      let currentRow = document.createElement("div");
      currentRow.classList.add("row");

      for (const projectId in data) {
        const projectData = data[projectId];

        if (projectData && projectData.p_name) {
          const card = document.createElement("div");
          card.classList.add("card");
          card.id = `project-card`;

          card.innerHTML = `
          <h2>${projectData.p_name}</h2>
          <p class="made-by">Made by: ${projectData.p_user_name}</p>
          <p class="content">
          <b>Type:</b> ${projectData.p_type}<br>
          <b>Description:</b> ${projectData.p_description}<br></p>
          <h5><i class="fa-solid fa-thumbs-up fa-xl"></i> <b>Likes:</b> ${projectData.p_likes}<br></h5>
          <a href="${projectData.file_storage_reference}" target="_blank">View Files</a>
          <a href="singleProject.html" target="_blank">View Project</a>
        `;

          currentRow.appendChild(card);
          cardCount++;

          if (cardCount === 3) {
            container.appendChild(currentRow);
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            cardCount = 0;
          }
        }
      }

      if (cardCount > 0) {
        container.appendChild(currentRow);
      }
    }
  });
});
