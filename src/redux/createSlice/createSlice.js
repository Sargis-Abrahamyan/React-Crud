import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const usersApi = createAsyncThunk("users", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return JSON.parse(localStorage.getItem("user")) || response.data;
});

export const usView = createAsyncThunk(
  "users/usersView",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (data.status === 200) {
        return console.error("Server error");
      }
      dispatch(viewUsers(id));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const usersDelete = createAsyncThunk(
  "users/usersDelete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/usersid/${id}`
      );
      if (response.status !== 200) new Error("delete task servers Error");
      dispatch(removeUsers(id));
    } 
    catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addUserItem = createAsyncThunk(
  "users/addUsers",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const users = {
        id: new Date().getTime(),
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
      };

      const { data } = await axios.post(
        `https://jsonplaceholder.typicode.com/users`,
        {
          params: {
            body: JSON.stringify(users),
          },
        }
      );
      if (data.status === 200) new Error("delete task servers Error");
      dispatch(addUsers(users));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const usersEdit = createAsyncThunk(
  "users/userEdit", async ({ id, name, username, email, phone },{ rejectWithValue, dispatch }) => {   
    try {
      const edit = {
        id,
        name,
        username,
        email,
        phone,
      };

      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          params: {
            body: JSON.stringify(edit),
          },
        }
      );

      if (response.status === 200) new Error("Edit task servers Error");
      dispatch(editUsers(edit));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: [],
    userSearch: [],
    loader: false,
    error: null,
  },

  reducers: {
    addUsers(state, { payload }) {
      state.user.push(payload);
      localStorage.setItem("user", JSON.stringify(state.user, payload));
    },

    removeUsers(state, { payload }) {
      state.user = state.user.filter((remove) => remove.id !== payload);
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    editUsers(state, { payload }) {
      state.user = state.user.map((item) => {
        if (item.id === payload.id) {
          item = payload;
        }
        return item;
      });
      
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    viewUsers(state, { payload }) {
      state.user = state.user.find((viewUser) => viewUser.id === payload.id);
    },

    searchUser: (state, { payload }) => {
      state.user = state.userSearch.filter(
        (itemUserSearch) =>
          itemUserSearch.name.toLowerCase().includes(payload) ||
          itemUserSearch.name.toUpperCase().includes(payload) ||
          itemUserSearch.username.toLowerCase().includes(payload) ||
          itemUserSearch.username.toUpperCase().includes(payload) ||
          itemUserSearch.email.toLowerCase().includes(payload) ||
          itemUserSearch.email.toUpperCase().includes(payload) ||
          itemUserSearch.phone.includes(payload)
      );
    },
  },
  extraReducers: {
    [usersApi.pending]: (state, action) => {
      state.loader = true;
    },

    [usersApi.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.user = payload;
      state.userSearch = payload;
    },

    [usersApi.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errors = payload;
    },
  },
});

export default usersSlice.reducer;

export const { addUsers, removeUsers, editUsers, viewUsers, searchUser } = usersSlice.actions;
