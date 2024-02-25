

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseConfig } from "../../env.js";
import { User } from "./user/user";
import { Order } from "./order/order";
import styles from "./share-table.module.scss";

const app = initializeApp(firebaseConfig);
export const db = {
  instance: getDatabase(app),
  baseUrl: "/",
  dbTableList: "tableList",
  dbOrderList: "orderList",
  dbUserList: "userList",
};
const baseRef = ref(db.instance, db.baseUrl);

export const ShareTable = () => {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = "Share Table";
    document.head.children.description.content = "Share a table with friends";

    onValue(baseRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setData(data);
      } else {
        setData(false);
      }
    });
  }, []);

  return (
    <div className={styles.shareTable}>
      <User data={data} db={db} />
      <Order data={data} db={db} />
    </div>
  );
};
