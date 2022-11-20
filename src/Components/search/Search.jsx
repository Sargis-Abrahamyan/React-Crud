import { useRef } from "react";
import { useDispatch } from "react-redux";

import { searchUser } from "../../redux/createSlice/createSlice";
import styles from "./search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  
  const handelSearch = () => {
    dispatch(searchUser(inputRef.current.value));
  };

  return (
    <input
      type="text"
      className={styles.searchInput}
      ref={inputRef}
      onChange={handelSearch}
      placeholder="Search Crud..."
    />
  );
};

export default Search;
