import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import { usersApi } from "../../redux/createSlice/createSlice";
import AddUser from "../pages/users/addNewUsers/AddUser.jsx";
import UsersItem from "../pages/users/usersItem/UsersItem";
import EditUser from "../pages/users/editUser/EditUser";
import View from "../pages/users/userView/View";
import Loader from "../../Components/loader/Loader.jsx";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const infoUsers = useSelector((state) => state.users.user);

  useEffect(() => {
    <Loader />
    dispatch(usersApi());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UsersItem infoUsers={infoUsers} />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser infoUsers={infoUsers} />} />
        <Route path="/users/:id" element={<View infoUsers={infoUsers} />} />

      </Routes>
    </div>
  );
}

export default App;
