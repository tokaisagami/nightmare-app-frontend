import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null; // ユーザー情報を追加
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null, // 初期値を設定
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
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

