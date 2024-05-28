import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import {
    collection,
    getDocs,
    query,
    where,
  } from "firebase/firestore";

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (uid) => {
    try {
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("uid", "==", `${uid}`));
      const data = await getDocs(q);
      return { ...data?.docs[0]?.data(), id: data?.docs[0]?.id };
    } catch (error) {
      return error;
    }
  }
);

const userDataSlice = createSlice({
  name: 'data',
  initialState: {
    items: {},
    loading:false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userDataSlice.reducer;