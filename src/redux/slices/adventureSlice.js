
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adventures: []
}

const adventureSlice = createSlice({
  name: 'adventureSlice',
  initialState,
  reducers: {
    addAdventure: (state, action) => {
      state.adventures = [action.payload, ...state.adventures];
    },
  }
})

export const {addAdventure} = adventureSlice.actions
export default adventureSlice.reducer
