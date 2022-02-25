import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    records:[
        {
            id: 0,
            name: 'Amazon',
            iconUrl: 'https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg',
            price: 2530.20
        },   
        {
            id: 1,
            name: 'Google',
            iconUrl:'https://staffordonline.org/wp-content/uploads/2019/01/Google-600x600.jpg',
            price: 2730.20
        },     
    ]
  }
  
  export const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
      addRecord: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        //state.value += 1
        state.records.push(action.payload);
      },
      decrement: (state) => {
        //state.value -= 1
      },
      deleteRecord: (state, action) => {
        //state.value += action.payload
        state.records = state.records.filter(item=> action.payload!==item.id)
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, deleteRecord } = recordSlice.actions
  
  export default recordSlice.reducer