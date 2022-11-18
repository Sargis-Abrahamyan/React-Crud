import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserItem } from "../../../../redux/createSlice/createSlice";
import styles from "./addUser.module.scss";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const handelAdd = (e) => {
    e.preventDefault();

    if (user.name.length < 3) {
      return alert(`Name must be longer than 3 letters`)
    }
    else if (user.username.length < 3) {
      return alert(`userName must be longer than 3 letters`)
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
      return alert(`Invalid email address`)
    }
    else {
      return (
        alert("you register successFully"),
        dispatch(addUserItem(user)),
        navigate("/")
      )
    }
  };

  return (

    <div className={styles.addUserContainer}>

      <h2 className={styles.addUserTitle}>Create User</h2>

      <form id={styles.formContainer} autoComplete="on" onSubmit={handelAdd} >
        <input
          type="text"
          placeholder="...name"
          name="name"
          value={user.name}
          onChange={(e) => inputChange(e)}
        />

        <input
          type="text"
          placeholder="...userName"
          name="username"
          value={user.username}
          onChange={(e) => inputChange(e)}
        />

        <input
          type="text"
          placeholder="...phone"
          name="phone"
          value={user.phone}
          onChange={(e) => inputChange(e)}
        />

        <input
          type="text"
          placeholder="...email"
          name="email"
          value={user.email}
          onChange={(e) => inputChange(e)}
        />

        <button>add new user</button>
        <button onClick={() => navigate("/")}>Back</button>

      </form>
    </div>
  );
};

export default AddUser;
