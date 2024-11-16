import { createSlice } from '@reduxjs/toolkit';
// import { LoginResponseProps } from '../../types/http/login.typs';
import { RootState } from '../store';
import { TokenProps } from '../../types/token.type';
import { UserProps } from '../../types/user.type';
import { decodeToken } from '../../utils/jwt';

export interface LoginSliceProps {
  token: TokenProps;
  user: UserProps;
}

const initialState: LoginSliceProps = {
  token: {} as TokenProps,
  user: {} as UserProps,
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
    deleteAuth: (state) => {
      state.token = initialState.token;
      state.user = initialState.user;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.accessToken = action.payload.accessToken;
  //       state.refreshToken = action.payload.refreshToken;
  //       state.loading = 'succeeded';
  //       setStoredAuth(action.payload);
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.loading = 'failed';
  //       state.error = action.error.message;
  //     })
  //     .addCase(login.pending, (state, action) => {
  //       state.loading = 'loading';
  //     });
  // },
});

export const loginSelector = (state: RootState) => state.login;
export default loginSlice.reducer = loginSlice.reducer;
export const { storeAuth, deleteAuth } = loginSlice.actions;
