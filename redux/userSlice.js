import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: {
      userID: null,
      displayName: null,
      loggedIn: false
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //state.value += 1
      state.userInfo.userID= action.payload.userID;
      state.userInfo.displayName= action.payload.displayName;
      state.userInfo.loggedIn = true;
    },
    logout: (state, action) => {
      //state.value += action.payload
      state.userInfo.displayName= null;
      state.userInfo.userID= null;
      state.userInfo.loggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
