import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  records: [
    // {
    //   shortName: "Google",
    //   symbol : 'test',
    //   iconUrl:
    //     "https://staffordonline.org/wp-content/uploads/2019/01/Google-600x600.jpg",
    //   regularMarketPrice: 2730.2,
    //   userID : null
    // },
  ],
};

export const recordSlice = createSlice({
  name: "record",
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
      state.records = state.records.filter(
        (item) => action.payload !== item.symbol
      );
    },
    loadRecords:(state,action)=>{
      state.records = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addRecord, decrement, deleteRecord, loadRecords } = recordSlice.actions;

export default recordSlice.reducer;
