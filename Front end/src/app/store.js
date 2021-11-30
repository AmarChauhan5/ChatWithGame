import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../user_list/userSlice'
import MyDataReducer from '../user_list/myDataSlice'
import socketReducer from '../socket/socketSlice'
import notificationReducer from '../socket/notificationSlice'
import addListReducer from '../user_list/addToListSlice'


export const store = configureStore({
    reducer: {
        socket:socketReducer,
        user:userReducer,
        my:MyDataReducer,
        addToList:addListReducer,
        notification:notificationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
  })