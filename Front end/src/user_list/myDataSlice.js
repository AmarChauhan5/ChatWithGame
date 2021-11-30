import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data:null
   
  }

export const myDataSlice = createSlice({
    name: 'my',
    initialState,
    reducers: {
        addMyDetail: (state,details) => {
        state.data = details
      }
    },
  })

  export const { addMyDetail } = myDataSlice.actions

export default myDataSlice.reducer
