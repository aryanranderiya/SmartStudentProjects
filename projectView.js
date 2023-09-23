import { initializeApp } from 'https://smart-student-projects-default-rtdb.firebaseio.com/';
import { getDatabase, ref, child, get } from "https://smart-student-projects-default-rtdb.firebaseio.com/";

// TODO: Replace the following with your app's Firebase project configuration
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

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
