import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addToList:null
   
  }

export const addToListSlice = createSlice({
    name: 'addToList',
    initialState,
    reducers: {
        addToList: (state,text) => {
        state.addToList = text
      }
    },
  })

  export const { addToList } = addToListSlice.actions

export default addToListSlice.reducer