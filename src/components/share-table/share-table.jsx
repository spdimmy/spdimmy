import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD6Imp9EtR9cCaZp89z5WzIbue8-1DMIz8",
  authDomain: "homepage-49923.firebaseapp.com",
  databaseURL:
    "https://homepage-49923-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homepage-49923",
  storageBucket: "homepage-49923.appspot.com",
  messagingSenderId: "981224231748",
  appId: "1:981224231748:web:03bcec4de2e6a06bbb3d11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const starCountRef = ref(database, "users");

export const ShareTable = () => {
  const [state, setState] = useState("loading...");

  function writeUserData() {
    set(ref(database, "users"), "test_string");
  }

  // writeUserData();

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setState(data);
    });
  }, []);

  return <h1>Firebase test and {state}</h1>;
};
