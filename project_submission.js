import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
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
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage();
const fileInput = document.getElementById("customFile");

const fileListContainer = document.getElementById("fileListContainer");

fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    fileListContainer.style.display = "block";
  } else {
    fileListContainer.style.display = "none";
  }
});

function updateFileInputAccept() {
  const projectTypeSelect = document.getElementById("projectType");
  const customFileInput = document.getElementById("customFile");

  const selectedProjectType = projectTypeSelect.value;

  let acceptedTypes = "";

  if (selectedProjectType === "Hardware") {
    acceptedTypes = "image/*,video/*,pdf/";
  } else if (selectedProjectType === "Software") {
    acceptedTypes = "*/*";
  }

  customFileInput.setAttribute("accept", acceptedTypes);
}

function updateFileList(inputElement) {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";

  const files = inputElement.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.isDirectory) {
      const listItem = document.createElement("li");
      listItem.textContent = `Folder: ${file.name}`;
      fileList.appendChild(listItem);

      const folderFiles = file.webkitGetAsEntry().createReader();
      folderFiles.readEntries(function (entries) {
        for (let j = 0; j < entries.length; j++) {
          const entry = entries[j];
          if (entry.isFile) {
            const subListItem = document.createElement("li");
            subListItem.textContent = `File: ${entry.name}`;
            fileList.appendChild(subListItem);
          }
        }
      });
    } else if (file.isFile) {
      const listItem = document.createElement("li");
      listItem.textContent = `File: ${file.name}`;
      fileList.appendChild(listItem);
    }
  }
}

function uploadDataToDatabaseAndStorage(
  projectName,
  projectDescription,
  projectType,
  uid
) {
  var fileInput = document.getElementById("customFile");
  var selectedFile = fileInput.files[0];
  var fileName = Date.now() + "_" + selectedFile.name;
  var fileRef = storageRef(storage, "Projects/" + fileName);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      var project_id =
        "project_" +
        user.displayName +
        "_" +
        Math.random().toString(16).slice(5);

      uploadBytes(fileRef, selectedFile)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then(function (downloadURL) {
          var projectsRef = ref(database, "Projects/" + project_id);

          set(projectsRef, {
            p_id: project_id,
            p_name: projectName,
            p_description: projectDescription,
            p_type: projectType,
            p_storage_reference: downloadURL,
            p_user_id: uid,
          }).then(() => {
            console.log("downloadurl: " + downloadURL);
          });

          var userProjectsRef = ref(
            database,
            "student/" + uid + "/projects/" + project_id
          );

          set(userProjectsRef, {
            project_url: downloadURL,
          }).then(() => {
            console.log("downloadurl: " + downloadURL);
          });

          alert("Data and file uploaded successfully!");
          document.getElementById("upload-form").reset();
        })
        .catch(function (error) {
          console.error("Error uploading file to Firebase Storage:", error);
          alert("Error uploading file. Please try again.");
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("upload-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      var projectName = document.getElementById("projectTitle").value;
      var projectDescription =
        document.getElementById("projectDescription").value;
      var projectType = document.getElementById("projectType").value;
      var studentId = "12345";

      uploadDataToDatabaseAndStorage(
        projectName,
        projectDescription,
        projectType,
        studentId
      );
    });
});
const modal = document.getElementById("myModal");
const closeButton = document.querySelector(".close");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

const helpLink = document.getElementById("helpLink");
helpLink.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
