import { createSlice } from '@reduxjs/toolkit'
  const initialState = {
    socket:null
  }

  export let socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
      addSocket: (state,socket) => {
        state.socket = socket
      }
    },
  })
  export const { addSocket } = socketSlice.actions

export default socketSlice.reducer