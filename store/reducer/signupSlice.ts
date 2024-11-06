import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/API/axiosinstance';

interface SignupState{
  name: string;
  username: string;
  email: string;
  phone: string,
  password: string;
  confirmPassword: string;
  status: "Idle" | "Loading" | "Successfull" | "Failed";
  error: string | null;
}
const initialState: SignupState = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  status: "Idle",
  error: null
}

export const signupUser = createAsyncThunk('signup/signupUser', async (userData:
   { name: string; username: string; email: string; password: string; phone: string }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/users/signup', userData);
    console.log(response) 
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
})


const signupSlice = createSlice({
  name: "signupUser",
  initialState,
  reducers: {
      SetName: (state, action) => {
          state.name = action.payload
      },
      SetUserName: (state, action) => {
          state.username = action.payload
      },
      SetEmail: (state, action) => {
          state.email = action.payload
      },
      SetPhone: (state, action) => {
          state.phone = action.payload
      },
      SetPassword: (state, action) => {
          state.password = action.payload
      },
      SetConfirmPassword: (state, action) => {
          state.confirmPassword = action.payload
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(signupUser.pending, (state) => {
              state.status = "Loading";
          })
          .addCase(signupUser.fulfilled, (state) => {
              state.status = "Successfull";
          })
          .addCase(signupUser.rejected, (state,action) => {
              state.status = "Failed";
              state.error = action.payload as string;
          })
  }
})
export const { SetName, SetUserName, SetEmail, SetPhone, SetPassword, SetConfirmPassword } = signupSlice.actions;
export default signupSlice.reducer;