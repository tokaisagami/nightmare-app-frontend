import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email') || '';
  const token = query.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      alert('パスワードが一致しません。');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/password_resets/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (response.ok) {
        alert('パスワードを変更しました');
        navigate('/login');
      } else {
        alert('パスワードのリセットに失敗しました');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('パスワードのリセット中にエラーが発生しました');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-KaiseiOpti text-center mb-4">パスワードリセット</h1>
        <p className="text-lg mb-4">メールアドレス: {email}</p>
        <div className="mb-4">
          <label className="block text-lg font-KaiseiOpti mb-2">新しいパスワード</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-KaiseiOpti mb-2">新しいパスワード（確認用）</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-KosugiMaru px-4 py-2 rounded"
          >
            更新
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
