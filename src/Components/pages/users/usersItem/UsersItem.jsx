import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";

import { removeUsers } from "../../../../redux/createSlice/createSlice";
import Loader from "../../../loader/Loader";
import CreateUser from "../createUser/CreateUser";
import styles from "./userItem.module.scss";

const = UsersItem({ infoUsers }) => {
  const loading = useSelector((state) => state.users.loader);
  const dispatch = useDispatch();

  return !loading ? (
    <>
      <CreateUser />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>userName</th>
            <th>phone</th>
            <th>email</th>
            <th>actions</th>
          </tr>
        </thead>

        {infoUsers &&
          infoUsers.map((user) => (
            <tbody key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className={styles.viewUserLink}
                    to={"/users/" + user.id}
                    title="View"
                  >
                    <i className="fa-sharp fa-solid fa-street-view"></i>
                  </Link>

                  <Link
                    className={styles.editUser}
                    to={`edit-user/${user.id}`}
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  
                  <button
                    className={styles.deleteUserBtn}
                    onClick={() => dispatch(removeUsers(user.id))}
                    title="Remove">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>

              </tr>
            </tbody>
          ))}

      </table>
    </>
  ) : (
    <Loader />
  );
}

export default UsersItem;
