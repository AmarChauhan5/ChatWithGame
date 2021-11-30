import { createSlice } from '@reduxjs/toolkit'
  const initialState = {
    notificationData:null
  }

  export let notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      addNotification: (state,data) => {
        state.notificationData = data
      }
    },
  })
  export const { addNotification } = notificationSlice.actions

export default notificationSlice.reducer