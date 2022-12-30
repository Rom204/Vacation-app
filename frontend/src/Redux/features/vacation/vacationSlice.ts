import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// have'nt used this vacation reducer
export interface VacationState {
    id: number;
    information: string;
    location: string;
    image: string;
    imageName: string;
    // look for dates errors !
    date_from: string 
    date_to: string 
    price: number;
    user_id: number;
}

const initialState: VacationState = {
  id: 0,
  information: "",
  location: "",
  image: "",
  imageName: "",
  date_from: "",
  date_to: "",
  price: 0,
  user_id: 0
}

export const vacationSlice = createSlice({
  name: 'vacation',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<VacationState>) => {
    
    },
    logout: (state) => {
      
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = vacationSlice.actions

export default vacationSlice.reducer