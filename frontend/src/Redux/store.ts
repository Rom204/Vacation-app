import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import vacationReducer from "./features/vacation/vacationSlice";


export const store = configureStore({
    reducer: { 
        user: userReducer,

        // have'nt used this vacation reducer
        vacation: vacationReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch