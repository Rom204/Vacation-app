import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./features/user/userSlice";
// change
// const reducers = combineReducers({ 
//     userState: UserReducer,
    
// });

export const store = configureStore({
    // change
    // reducer: reducers
    reducer: { 
        user: userReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch