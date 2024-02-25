import { set, ref } from "firebase/database";
import { db } from "../share-table/share-table";

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// User local storage
export const getUserIdFromLocalStorage = () => {
  return localStorage.getItem("userId") || null;
};

export const addUserIdToLocalStorage = () => {
  const userId = uuidv4();

  localStorage.setItem("userId", userId);

  return userId;
};

// Order local storage
export const getOrderIdFromLocalStorage = () => {
  return localStorage.getItem("orderId") || null;
};

export const addOrderIdToLocalStorage = () => {
  const orderId = uuidv4();

  localStorage.setItem("orderId", orderId);

  return orderId;
};

// Table local storage
export const getTableIdFromLocalStorage = () => {
  return localStorage.getItem("tableId") || null;
};

export const addTableIdToLocalStorage = () => {
  const tableId = uuidv4();

  localStorage.setItem("tableId", tableId);

  return tableId;
};

// Table db
export const addTableList = () => {
  const tableId = addTableIdToLocalStorage();
  const orderId = addOrderList();
  const currentRef = ref(db.instance, db.dbTableList + "/" + tableId);
  set(currentRef, { tableId, orders: { id: orderId } });
};

export const updateTableList = () => {
  const tableId = getTableIdFromLocalStorage();
  const orderId = getOrderIdFromLocalStorage();
  const currentRef = ref(
    db.instance,
    db.dbTableList + "/" + tableId + "/orders/"
  );
  set(currentRef, { orderId });
};

// Order db
export const addOrderList = () => {
  const orderId = addOrderIdToLocalStorage();
  const currentRef = ref(db.instance, db.dbOrderList + "/" + orderId);

  set(currentRef, {
    id: orderId,
    userId: getUserIdFromLocalStorage(),
    tableId: getTableIdFromLocalStorage(),
  });

  return orderId;
};

export const updateOrderList = (titlePrice) => {
  const orderId = getOrderIdFromLocalStorage();
  const orderItemId = uuidv4();

  const currentRef = ref(
    db.instance,
    db.dbOrderList + "/" + orderId + "/orderItems/" + orderItemId
  );

  set(currentRef, {
    id: orderItemId,
    count: 1,
    ...titlePrice,
  });
};

// User db
export const addUserList = (name) => {
  const userId = addUserIdToLocalStorage();
  const currentRef = ref(db.instance, db.dbUserList + "/" + userId);
  set(currentRef, { id: userId, name, orders: [] });
};

export const updateUserList = (name) => {
  const userId = getUserIdFromLocalStorage();
  const currentRef = ref(db.instance, db.dbUserList + "/" + userId + "/name");
  set(currentRef, name);
};
