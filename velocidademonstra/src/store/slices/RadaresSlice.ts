import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  regiao: {
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
};
export const radaresSlice = createSlice({
  name: 'radares',
  initialState,
  reducers: {
    updateRadares: (state = initialState, action) =>
      Object.assign(state, action.payload),
  },
});
export const {updateRadares} = radaresSlice.actions;

export default radaresSlice.reducer;
