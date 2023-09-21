import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

import {
  getAuth,
  browserSessionPersistence,
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
  } else {
    console.log("No user is signed in.");
  }
});

// onValue(ref(database, "Universities/1/"), (snapshot) => {
//   const data = snapshot.val();
//   var universitiesComboBox = document.getElementById(
//     "universitiesComboBox"
//   );

//   universitiesComboBox.innerHTML =
//     '<option value="">Select University</option>';

//   snapshot.forEach(function (childSnapshot) {
//     var universityName = childSnapshot.val();

//     var option = document.createElement("option");
//     option.value = universityName;
//     option.textContent = universityName;
//     universitiesComboBox.appendChild(option);
//   });
// });

// REMOVE THIS CODE AND REPLACE WITH ALGOLIA SEARCH FOR FAST SEARCH

// const universitySelectInput = document.getElementById("universitySelect");

// universitySelectInput.addEventListener("input", handleUniversitySearch);

// function handleUniversitySearch() {
//   const searchTerm = universitySelectInput.value.toLowerCase();

//   const universitySelect = document.getElementById("universitySelect");
//   universitySelect.innerHTML = "";

//   onValue(ref(database, "Universities"), (snapshot) => {
//     snapshot.forEach((collegeSnapshot) => {
//       const collegeId = collegeSnapshot.key;
//       const collegeData = collegeSnapshot.val();

//       if (
//         collegeData &&
//         collegeData.College_Name &&
//         collegeData.College_Name.toLowerCase().includes(searchTerm)
//       ) {
//         onValue(
//           ref(database, `Universities/${collegeId}`),
//           (universitySnapshot) => {
//             universitySnapshot.forEach((universityChildSnapshot) => {
//               const universityName = universityChildSnapshot
//                 .val()
//                 .toLowerCase();

//               const option = document.createElement("option");
//               option.value = universityName;
//               option.textContent = universityChildSnapshot.val();
//               universitySelect.appendChild(option);
//             });
//           }
//         );
//       }
//     });
//   });
// }

//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
//   import {
//     getDatabase,
//     ref,
//     set,
//   } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

//   const firebaseConfig = {
//     databaseURL:
//       "https://smart-student-projects-default-rtdb.firebaseio.com/",
//   };

//   const app = initializeApp(firebaseConfig);
//   const database = getDatabase(app);

//   var apiUrl =
//     "https://api.data.gov.in/resource/44bea382-c525-4740-8a07-04bd20a99b52?api-key=579b464db66ec23bdd00000159244116cf4748d26db4af8a31c90893&format=json";

//   function fetchPage(pageNumber) {
//     var pageUrl = apiUrl + "&offset=" + pageNumber * 10;

//     fetch(pageUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         var colleges = data.records;

//         colleges.forEach(function (college, index) {
//           const db = getDatabase();
//           set(ref(db, "Universities/" + college.s_no_), {
//             College_Name: college.college_name,
//             State: college.state_name,
//             District: college.district_name,
//           })
//             .then(() => {
//               console.log(
//                 "Data for ID " + college.s_no_ + " uploaded successfully."
//               );
//             })
//             .catch((error) => {
//               console.error(
//                 "Error uploading data for ID " +
//                   college.s_no_ +
//                   ": " +
//                   error.message
//               );
//             });

//           console.log("ID: " + college.s_no_);

//           //   console.log("University Name: " + college.university_name);
//           console.log("College Name: " + college.college_name);
//           //   console.log("College Type: " + college.college_type);
//           //   console.log("State Name: " + college.state_name);
//           //   console.log("District Name: " + college.district_name);
//           console.log("\n");
//         });

//         if (colleges.length === 10) {
//           fetchPage(pageNumber + 1);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }

//   fetchPage(0);
