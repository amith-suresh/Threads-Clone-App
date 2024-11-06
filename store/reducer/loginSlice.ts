import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/API/axiosinstance";


interface UserState {
  user: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any | null;
}


const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};


export const loginUser = createAsyncThunk(
  'login/user',
  async (userData: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', userData);
      console.log(response)
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

     logoutUser: (state) => {
       state.user = null;
       state.status = 'idle';
     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
export const {logoutUser } = loginSlice.actions;
