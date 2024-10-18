import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/slices/registerSlice';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesomeのインポート
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // 必要なアイコンのインポート

const UserSignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/signup`, {
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
        navigate('/login', { state: { email, password, message: 'ユーザー登録が成功しました！', messageType: 'success' } }); // メッセージを渡す
      } else {
        console.error('Signup failed:', data);
        setMessage('ユーザー登録に失敗しました。もう一度お試しください。');
        setMessageType('error'); // エラーメッセージを設定して、遷移せずに留まる
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">新規ユーザー登録</h1>
        {message && (
          <div className={`p-4 mb-4 text-sm rounded ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {message}
          </div>
        )}
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
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">パスワード:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">パスワード（確認）:</label>
            <div className="relative">
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              />
              <span
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
              >
                <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
              </span>
            </div>
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
