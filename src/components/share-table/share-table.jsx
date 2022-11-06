import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import styles from "./share-table.module.scss";
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

  const handleAddingOrder = (event) => {
    const target = event.target;
  };

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setState(data);
    });
  }, []);

  return (
    <div className={styles.shareTable}>
      {/* <h1>Firebase test and {state}</h1> */}

      <form onSubmit={handleAddingOrder} className={styles.shareTable_addOrder}>
        <input
          type="text"
          placeholder="Type order name"
          className={styles.shareTable_addOrderTitle}
          name="orderTitle"
          required
        />
        <input
          type="number"
          placeholder="$"
          min="1"
          max="999"
          className={styles.shareTable_addOrderPrice}
          name="orderPrice"
        />
        <button type="submit" className={styles.shareTable_addOrderSubmit}>
          +
        </button>
      </form>

      <ul className={styles.shareTable_orderList}>
        <li className={styles.shareTable_orderItem}>
          <span className={styles.shareTable_orderItemTitle}>Pivo</span>
          <span className={styles.shareTable_orderItemPrice}>165</span>
          <span className={styles.shareTable_orderItemCount}>3</span>
          <button className={styles.shareTable_orderItemCountDecrease}>
            -
          </button>
          <button className={styles.shareTable_orderItemCountIncrease}>
            +
          </button>
        </li>
        <li className={styles.shareTable_orderItem}>
          <span className={styles.shareTable_orderItemTitle}>
            Svíčková na smetaně
          </span>
          <span className={styles.shareTable_orderItemPrice}>215</span>
          <span className={styles.shareTable_orderItemCount}>1</span>
          <button className={styles.shareTable_orderItemCountDecrease}>
            -
          </button>
          <button className={styles.shareTable_orderItemCountIncrease}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
};
