import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseConfig } from "../../env.js";

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
