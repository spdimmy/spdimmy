import styles from "./user.module.scss";
import {
  getUserIdFromLocalStorage,
  addUserList,
  updateUserList,
} from "../utils";
import { useState } from "react";

export const User = ({ data, db: { instance, dbUserList } }) => {
  const [editMode, setEditMode] = useState(false);

  const handleSubmitUserForm = (event) => {
    event.preventDefault();
    navigator.vibrate(30);

    const {
      target: {
        children: { userName },
      },
    } = event;

    editMode ? updateUserList(userName) : addUserList(userName);
    setEditMode(false);
  };

  const handleEditingUser = () => {
    navigator.vibrate(20);

    setEditMode(true);
  };

  const handleCloseEditingUser = () => {
    navigator.vibrate(20);

    setEditMode(false);
  };

  return (
    <div className={styles.user}>
      {data === null ? (
        <>
          <h2>loading...</h2>
        </>
      ) : !editMode &&
        data[dbUserList] &&
        data[dbUserList][getUserIdFromLocalStorage()] ? (
        <h2>
          {data[dbUserList][getUserIdFromLocalStorage()].name}
          <i onClick={handleEditingUser}>Edit</i>
        </h2>
      ) : (
        <form className={styles.user_addUser} onSubmit={handleSubmitUserForm}>
          <input
            type="text"
            placeholder="Type your name"
            name="userName"
            defaultValue={
              editMode ? data[dbUserList][getUserIdFromLocalStorage()].name : ""
            }
            required
          />
          {editMode && (
            <button type="button" onClick={handleCloseEditingUser}>
              x
            </button>
          )}
          <button type="submit">+</button>
        </form>
      )}
    </div>
  );
};
