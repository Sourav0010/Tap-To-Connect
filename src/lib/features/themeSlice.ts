import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   colorVariant: '',
   isDarkMode: false,
};

const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setColorVariant: (state, action) => {
         state.colorVariant = action.payload;
      },
      toggleDarkMode: (state, action) => {
         console.log(action.payload);
         state.isDarkMode = action.payload;
      },
   },
});

export const { setColorVariant, toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
