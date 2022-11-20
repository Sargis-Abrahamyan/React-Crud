import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { usersEdit } from "../../../../redux/createSlice/createSlice";
import styles from "./editUser.module.scss";

const EditUser = ({ infoUsers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const existingUser = infoUsers.find((user) => user.id === Number(id));
  const { name, username, email, phone } = existingUser;

  const [user, setUser] = useState({
    name,
    username,
    email,
    phone,
  });

  const handleinputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setUser({ name: "", username: "", email: "", phone: "" });

    dispatch(
      usersEdit({
        id: Number(id),
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
      })
    );

    navigate("/");
  };

  return (
    <div className={styles.editContainer}>
      <h2 className={styles.editTitle}>Edit User</h2>

      <form id={styles.formEditContainer} autoComplete="off">
        <input
          type="text"
          placeholder="...name"
          name="name"
          value={user.name}
          onChange={(e) => handleinputChange(e)}
        />
        <input
          type="text"
          placeholder="...userName"
          name="username"
          value={user.username}
          onChange={(e) => handleinputChange(e)}
        />
        <input
          type="text"
          placeholder="...phone"
          name="phone"
          value={user.phone}
          onChange={(e) => handleinputChange(e)}
        />
        <input
          type="text"
          placeholder="...email"
          name="email"
          value={user.email}
          onChange={(e) => handleinputChange(e)}
        />
        <button onClick={handleEditUser}>edit new user</button>
        <button onClick={() => navigate("/")}>Back</button>

      </form>
    </div>
  );
};

export default EditUser;
