import React from "react";

import { useNavigate } from "react-router-dom";
import Search from "../../../search/Search";
import styles from "./createUser.module.scss";

const CreateUser = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.createUserContainer}>

      <h1>CRUD</h1>

      <Search />
      <button onClick={() => navigate("/users/add")} className={styles.addBtnUser}>
        <i className="fa-solid fa-user"></i>
        Add Create User
      </button>
    </div>
  );
};
export default CreateUser;
