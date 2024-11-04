import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const MyPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mypage flex flex-col justify-center items-center mt-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">マイページ</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-2">ユーザー名: {user.name}</p>
        <p className="text-lg md:text-xl lg:text-2xl mb-2">メール: {user.email}</p>
        {/* 必要に応じて他のユーザー情報を追加 */}
      </div>
    </div>
  );
};

export default MyPage;
