import React, { useState } from 'react';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleRequest = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/password_resets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('パスワードリセット手順を送信しました');
      } else {
        alert('パスワードリセット手順の送信に失敗しました');
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      alert('パスワードリセット手順の送信中にエラーが発生しました');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-KaiseiOpti text-center mb-4">パスワードリセット</h1>
        <div className="mb-4">
          <label className="block text-lg font-KaiseiOpti mb-2">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex">
          <button
            onClick={handleRequest}
            className="w-1/4 bg-blue-500 hover:bg-blue-600 text-white font-KosugiMaru px-4 py-2 rounded"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
