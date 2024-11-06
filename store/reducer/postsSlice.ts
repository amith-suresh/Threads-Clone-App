import axiosInstance from "@/API/axiosinstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
}

interface Post {
    _id: string;
    postById: User;
    text: string;
    image?: string; 
    likes: string[];
    replies: string[];
    createdOn: string;
    reposts: string[];
}

interface PostsState {
    posts: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    status: "idle",
    error: null,
};


export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        const response = await axiosInstance.get('/posts'); 
        return response.data.posts; 
    }
);



export const addPost = createAsyncThunk(
    "posts/addPost",
    async (newPost: { userId: string; text: string; image?: File | null },{ rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('userId', newPost.userId);
            formData.append('text', newPost.text);
            if (newPost.image) {
                formData.append('image', newPost.image); 
            }

            const response = await axiosInstance.post("/posts", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue({ message: error.response.data.message || "Failed to add new post" });
            }
            return rejectWithValue({ message: "Network error, please try again." });
        }
    }
);


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch posts.";
            })
            .addCase(addPost.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.status = "succeeded";
                state.posts.unshift(action.payload); 
            })
            .addCase(addPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to add post.";
            });
    },
});

export default postSlice.reducer;
