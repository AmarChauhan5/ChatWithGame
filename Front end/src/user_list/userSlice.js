import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    details:null
   
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      addDetail: (state,details) => {
        state.details = details
      }
    },
  })

  export const { addDetail } = userSlice.actions

export default userSlice.reducer
