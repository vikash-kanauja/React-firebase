import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig"
import { imageStorage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export const signupUser = createAsyncThunk("auth/signupUser", async (data) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return response.user;
  } catch (error) {
    return error;
  }
});

export const storeUserData = createAsyncThunk("auth/storeUserData", async (data) => {
  try {
    const images = ref(imageStorage, `image/${data.userId}`)
    const uploadedData = await uploadBytes(images, data.formData.profilePhoto)
    const imgUrls = await getDownloadURL(uploadedData.ref, "image URL")

    const userInfo = {
      firstName: data?.formData?.firstName,
      lastName: data?.formData?.lastName,
      mobileNo: data?.formData?.mobileNo,
      profilePhoto: imgUrls,
      email: data?.formData?.email,
      uid: data?.userId

    }
    await addDoc(collection(db, "users"), userInfo);
  } catch (error) {
    return error;
  }
})

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