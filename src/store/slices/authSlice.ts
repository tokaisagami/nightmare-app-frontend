import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload; // ログイン時にユーザー情報を設定
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null; // ログアウト時にユーザー情報をクリア
    },
    updateUser(state, action: PayloadAction<User>) { // 追加
      if (state.user) {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions; // updateUser を追加
export default authSlice.reducer;

