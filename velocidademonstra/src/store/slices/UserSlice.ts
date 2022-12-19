import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
  coords: {
    latitude: 0,
    longitude: 0,
  },
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state = initialState, action) =>
      Object.assign(state, action.payload),
  },
});
export const {updateUser} = userSlice.actions;

export default userSlice.reducer;
