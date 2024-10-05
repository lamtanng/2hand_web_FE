import { createSlice } from '@reduxjs/toolkit';
import { Loading } from '../../types/enum/loading.type';
import { LoginResponseProps } from '../../types/http/login.typs';
import { RootState } from '../store';

export interface LoginSliceProps extends LoginResponseProps {
  loading: Loading;
  error: string | undefined;
}

const initialState: LoginSliceProps = {
  accessToken: '',
  refreshToken: '',
  id: '',
  email: '',
  role: [],
  loading: Loading.Idle,
  error: undefined,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
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
export default loginSlice.reducer;
