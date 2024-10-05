import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPIs } from '../../apis/auth.api';
import { LoginRequestProps } from '../../types/http/login.typs';

const login = createAsyncThunk('login/login', async (data: LoginRequestProps) => {
  const resp = await authAPIs.login(data);
  return resp;
});

export { login };
