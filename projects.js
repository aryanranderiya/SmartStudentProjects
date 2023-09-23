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

  const projectsRef = ref(database, "projects");

  onValue(projectsRef, (snapshot) => {
    const data = snapshot.val();

    if (data !== null) {
      for (const projectId in data) {
        console.log(projectId);
        if (Object.hasOwnProperty.call(data, projectId)) {
          const projectData = data[projectId];

          const card = document.createElement("div");
          card.classList.add("card");

          card.innerHTML = `
            <h2>${projectData.name}</h2>
            <p>Total Likes: ${projectData.total_likes}</p>
            <a href="${projectData.project_url}" target="_blank">Project URL</a>
          `;

          console.log(projectData);
          container.appendChild(card);
        }
      }
    }
  });
});
