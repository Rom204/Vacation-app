import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { VacationModel } from '../../../Models/vacation_model'

// const getTime = () => new Date(Date.now()).toLocaleDateString()

// have'nt used this vacation reducer
export interface VacationState {
  vacation : VacationModel[]  
  
}

const initialState: VacationState = {
  vacation: []
}

export const vacationSlice = createSlice({
  name: 'vacation',
  initialState: initialState,
  reducers: {
    setVacation: (state, action) => {
      state.vacation = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setVacation } = vacationSlice.actions

export default vacationSlice.reducer