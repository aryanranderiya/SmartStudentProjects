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

// Function to upload a single file
function uploadSingleFile(
  file,
  uid,
  projectName,
  projectDescription,
  projectType
) {
  const fileName = Date.now() + "_" + file.name;
  const fileRef = storageRef(storage, "Projects/" + fileName);

  // Check the selected project type and allowed file types
  const allowedTypes =
    projectType === "Hardware" ? ["image/*", "video/*"] : ["application/zip"];

  if (!allowedTypes.includes(file.type)) {
    alert("Invalid file type. Please select the correct project type.");
    return;
  }

  // Upload the single file to Firebase Storage
  uploadBytes(fileRef, file)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then(function (downloadURL) {
      const project_id = "project_" + uid + "_" + Date.now();
      var projectRef = ref(database, "Projects/" + project_id);

      set(projectRef, {
        p_id: project_id,
        p_name: projectName,
        p_description: projectDescription,
        p_type: projectType,
        p_user_id: uid,
        p_likes: 0,
        file_storage_reference: downloadURL,
      }).then(() => {
        console.log("File uploaded: " + fileName);
        alert("File uploaded successfully!");
      });
    })
    .catch(function (error) {
      console.error("Error uploading file to Firebase Storage:", error);
      alert("Error uploading file. Please try again.");
    });
}

// Function to handle the form submission
function uploadFileDataToDatabaseAndStorage(
  projectName,
  projectDescription,
  projectType,
  uid
) {
  var fileInput = document.getElementById("customFile");
  var selectedFiles = fileInput.files;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;

      if (selectedFiles.length === 0) {
        alert("Please select a file.");
        return;
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        uploadSingleFile(
          file,
          uid,
          projectName,
          projectDescription,
          projectType
        );
      }

      document.getElementById("upload-form").reset();
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

      uploadFileDataToDatabaseAndStorage(
        projectName,
        projectDescription,
        projectType,
        studentId
      );
    });
});

const fileInput = document.getElementById("customFile");

fileInput.addEventListener("change", function () {
  const fileList = document.getElementById("fileList");
  const fileListContainer = document.getElementById("fileListContainer");
  fileListContainer.style.display = "block";
  fileList.innerHTML = "";

  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const listItem = document.createElement("li");
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }
});

// function updateFileList(inputElement) {
//   const fileList = document.getElementById("fileList");
//   fileList.innerHTML = "";

//   const files = inputElement.files;
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const listItem = document.createElement("li");
//     listItem.textContent = file.name;
//     fileList.appendChild(listItem);
//   }
// }

function updateFileInputAccept() {
  const projectTypeSelect = document.getElementById("projectType");
  const customFileInput = document.getElementById("customFile");

  const selectedProjectType = projectTypeSelect.value;

  let acceptedTypes = "";

  if (selectedProjectType === "Hardware") {
    acceptedTypes = "image/*,video/*";
  } else if (selectedProjectType === "Software") {
    acceptedTypes = ".zip";
  }

  customFileInput.setAttribute("accept", acceptedTypes);
}

updateFileInputAccept();

const modal = document.getElementById("myModal");
const btn_close = document.getElementById("btn_close");

btn_close.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

const helpLink = document.getElementById("helpLink");
helpLink.addEventListener("click", openModal);

const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
