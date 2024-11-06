import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/API/axiosinstance";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await axiosInstance.get("/users");
    return response.data.users;
});

export const fetchUserData = createAsyncThunk('user/fetchUserData',async (userId:string) => {
    const response = await axiosInstance.get(`users/${userId}`);
    return response.data;
})

interface User {
    _id: string;
    name: string;
    followers: string[];
    following: string[];
    email: string;
    username: string;
    profilePic: string;
}

interface UserState {
    users: User[];
    status: "idle" | "loading" | "succeeded" | "failed";
    userData :User[];
    posts:any[]
    error: string | null;
}

const initialState: UserState = {
    users: [],
    userData:[],
    posts:[],
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || action.error.message || null;
            });
    },
});

export default userSlice.reducer;
 