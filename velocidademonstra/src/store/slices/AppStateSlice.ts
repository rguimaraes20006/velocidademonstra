import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  selected: 0,
};
export const appStateSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateAppState: (state = initialState, action) =>
      Object.assign(state, action.payload),
  },
});
export const {updateAppState} = appStateSlice.actions;

export default appStateSlice.reducer;
