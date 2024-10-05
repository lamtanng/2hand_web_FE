import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/login.slice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    //fix error: A non-serializable value was detected in an action, in the path: `payload`. Value: [Function anonymous]
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
