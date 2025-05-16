import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './features/themeSlice';

export const makeStore = () => {
   return configureStore({
      reducer: {
         themeSlice,
      },
   });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
