import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUser } from '../../store/slices/authSlice'; // 更新アクションをインポート

const AccountSettings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = async () => {
    if (user?.id) {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          dispatch(updateUser(updatedUser)); // ユーザー情報を更新
          alert('アカウント情報が更新されました');
        } else {
          console.error('Failed to update user');
          alert('アカウント情報の更新に失敗しました');
        }
      } catch (error) {
        console.error('Error updating user:', error);
        alert('アカウント情報の更新中にエラーが発生しました');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-KaiseiOpti text-center mb-4">アカウント設定</h1>
        <div className="mb-4">
          <label className="block text-lg font-KaiseiOpti mb-2">ユーザー名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-KaiseiOpti mb-2">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-4 items-center">
          <button
            onClick={handleSave}
            className="w-1/4 bg-blue-500 hover:bg-blue-600 text-white font-KosugiMaru px-4 py-2 rounded"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
