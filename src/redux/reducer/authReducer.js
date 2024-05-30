import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { imageStorage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = response.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        accessToken: await user.getIdToken(),
      };
      return userData;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem("accessToken", response?.user.accessToken);
      return response.user;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const storeUserData = createAsyncThunk(
  "auth/storeUserData",
  async (data) => {
    try {
      const images = ref(imageStorage, `image/${data.userId}`);
      const uploadedData = await uploadBytes(
        images,
        data.formData.profilePhoto
      );
      const imgUrls = await getDownloadURL(uploadedData.ref, "image URL");

      const userInfo = {
        firstName: data?.formData?.firstName,
        lastName: data?.formData?.lastName,
        phoneNumber: data?.formData?.phoneNumber,
        profilePhoto: imgUrls,
        email: data?.formData?.email,
        uid: data?.userId,
      };
      await addDoc(collection(db, "users"), userInfo);
    } catch (error) {
      return error;
    }
  }
);

export const getUserData = createAsyncThunk("data/getUserData", async (uid) => {
  try {
    console.log("Getuser");
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("uid", "==", `${uid}`));
    const data = await getDocs(q);
    return { ...data?.docs[0]?.data(), id: data?.docs[0]?.id };
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
