import { createSlice } from '@reduxjs/toolkit';
import { LoginResponseProps } from '../../types/http/login.typs';
import { RootState } from '../store';
import { TokenProps } from '../../types/token.type';
import { AccountProps } from '../../types/account.type';
import { decodeToken } from '../../utils/jwt';

export interface LoginSliceProps {
  token: TokenProps;
  user: AccountProps;
}

const initialState: LoginSliceProps = {
  token: {} as TokenProps,
  user: {} as AccountProps,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    storeAuth: (state, action) => {
      const user = decodeToken(action.payload?.data?.accessToken);
      state.token = action.payload.data;
      state.user = user;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.accessToken = action.payload.accessToken;
    //     state.refreshToken = action.payload.refreshToken;
    //     state.loading = 'succeeded';
    //     setStoredAuth(action.payload);
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.loading = 'failed';
    //     state.error = action.error.message;
    //   })
    //   .addCase(login.pending, (state, action) => {
    //     state.loading = 'loading';
    //   });
  },
});

export const loginSelector = (state: RootState) => state.login;
export default loginSlice.reducer = loginSlice.reducer;
export const { storeAuth } = loginSlice.actions;
