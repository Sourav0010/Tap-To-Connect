import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './features/themeSlice';
import userSlice from './features/userSlice';

export const makeStore = () => {
   return configureStore({
      reducer: {
         themeSlice,
         userSlice,
      },
   });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
