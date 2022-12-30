import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    user_id: number;
    firstName: string;
    lastName: string;
    username: string;
    Pwd: string;
    matchedPwd: string;
    user_role: string;
}

const initialState: UserState = {
    user_id: 0,
    firstName: "",
    lastName: "",
    username: "",
    Pwd: "",
    matchedPwd: "",
    user_role: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.user_id = action.payload.user_id
      state.username = action.payload.username
      state.user_role = action.payload.user_role
    },
    logout: (state) => {
      state.user_id = 0
      state.username = ""
      state.user_role = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer