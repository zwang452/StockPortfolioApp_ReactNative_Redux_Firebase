import {configureStore} from '@reduxjs/toolkit'
import recordReducer from './recordSlice'
import userReducer from './userSlice'

export default configureStore({
    reducer: {
        recordReducer: recordReducer,
        userReducer: userReducer
    }
});