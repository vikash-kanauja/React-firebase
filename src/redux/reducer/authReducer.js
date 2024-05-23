import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"

export const signupUser = createAsyncThunk("auth/signupUser", async (data) => {
  console.log(data, "data");
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return response;
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default authSlice.reducer;