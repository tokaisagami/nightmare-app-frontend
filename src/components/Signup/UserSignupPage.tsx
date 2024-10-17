import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/slices/registerSlice';
import { useNavigate } from 'react-router-dom'

const UserSignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        dispatch(register()); // 登録状態を更新
        navigate('/login', { state: { email, password } }); // ログイン画面に遷移し、メールとパスワードを渡す
      } else {
        console.error('Signup failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">新規ユーザー登録</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">名前:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 rounded bg-gray-50" 
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">パスワード（確認）:</label>
            <input 
              type="password" 
              value={passwordConfirmation} 
              onChange={(e) => setPasswordConfirmation(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 rounded bg-gray-50" 
            />
          </div>
          <div className="flex flex-col space-y-4 items-center">
            <button type="submit" className="w-2/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              登録
            </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignupPage;
