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

function uploadFolderContents(folder, uid, project_id) {
  const folderName = folder.name;
  const folderRef = ref(
    database,
    "Projects/" + project_id + "/Folders/" + folderName
  );

  // Upload the folder name to the database
  set(folderRef, {
    folder_name: folderName,
    p_user_id: uid,
  }).then(() => {
    console.log("Folder name uploaded: " + folderName);
  });

  // Iterate through the folder's contents (files and subfolders)
  const entries = folder.webkitGetAsEntry().createReader();
  entries.readEntries(function (folderContents) {
    for (let j = 0; j < folderContents.length; j++) {
      const entry = folderContents[j];
      if (entry.isFile) {
        // Upload individual files
        const selectedFile = entry.file();
        const fileName = Date.now() + "_" + entry.name;
        const fileRef = storageRef(
          storage,
          "Projects/" + project_id + "/" + folderName + "/" + fileName
        );

        uploadBytes(fileRef, selectedFile)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then(function (downloadURL) {
            var fileEntryRef = ref(
              database,
              "Projects/" +
                project_id +
                "/Folders/" +
                folderName +
                "/files/" +
                fileName
            );

            set(fileEntryRef, {
              file_name: fileName,
              file_storage_reference: downloadURL,
              p_user_id: uid,
            }).then(() => {
              console.log("File uploaded: " + fileName);
            });
          })
          .catch(function (error) {
            console.error("Error uploading file to Firebase Storage:", error);
            alert("Error uploading file. Please try again.");
          });
      } else if (entry.isDirectory) {
        // Recursively upload contents of subfolders
        uploadFolderContents(entry, uid, project_id);
      }
    }
  });
}

function uploadDataToDatabaseAndStorage(
  projectName,
  projectDescription,
  projectType,
  uid
) {
  var fileInput = document.getElementById("customFile");
  var selectedFiles = fileInput.files;
  var project_id = "project_" + uid + "_" + Date.now();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      uploadFolderContents(selectedFiles[0], uid, project_id);

      var projectRef = ref(database, "Projects/" + project_id);

      set(projectRef, {
        p_id: project_id,
        p_name: projectName,
        p_description: projectDescription,
        p_type: projectType,
        p_user_id: uid,
      }).then(() => {
        console.log("Project details uploaded");
      });

      var userProjectsRef = ref(
        database,
        "student/" + uid + "/projects/" + project_id
      );

      set(userProjectsRef, {
        project_url: project_id,
      }).then(() => {
        console.log("User project uploaded");
      });

      alert("Data and files uploaded successfully!");
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

      uploadDataToDatabaseAndStorage(
        projectName,
        projectDescription,
        projectType,
        studentId
      );
    });
});

const modal = document.getElementById("myModal");

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
    acceptedTypes = "image/*,video/*,pdf/*";
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
    const listItem = document.createElement("li");
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }
}

updateFileInputAccept();
