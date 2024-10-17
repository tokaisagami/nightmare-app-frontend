import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();
  const state = location.state as { email: string; password: string } | undefined;

  const [email, setEmail] = useState(state?.email || ''); // 初期状態を遷移時の状態に設定
  const [password, setPassword] = useState(state?.password || '');
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        dispatch(login());  // ログイン状態を更新
      } else {
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/guest_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Guest login successful:', data);
        dispatch(login());  // ログイン状態を更新
      } else {
        console.error('Guest login failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">ログイン</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 rounded bg-gray-50" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">パスワード:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 rounded bg-gray-50" 
            />
          </div>
          <div className="flex flex-col space-y-4 items-center">
            <button
              type="submit" 
              className="w-2/4 bg-green-300 hover:bg-emerald-500 text-gray-600 hover:text-white font-bold py-2 px-4 rounded">
              ログイン
            </button>
            <button type="button" onClick={handleGuestLogin} className="w-2/4 bg-amber-200 hover:bg-yellow-400 text-gray-600 font-bold py-2 px-4 rounded">
              ゲストログイン
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">新規登録へ</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
