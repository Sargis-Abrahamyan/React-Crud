import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./view.module.scss"

const View = ({ infoUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const userView = infoUsers.find((i) => i.id === Number(id));

  return (
    <div className={styles.viewContainer}>
      <h2 className={styles.viewTitle}>View: id {userView.id}</h2>
      <div className={styles.userViewBlock}>
        <h4>Name : {userView.name}</h4>
        <h4>userName : {userView.username}</h4>
        <h4>email : {userView.email}</h4>
        <h4>phone : {userView.phone}</h4>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default View;
