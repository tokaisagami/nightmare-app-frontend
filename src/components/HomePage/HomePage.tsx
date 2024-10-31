import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-8">ようこそ Nightmare Appへ</h1>
      <p className="mb-4">悪夢を改変し、すっきりした気分になりましょう！</p>
      <div>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">ログイン</Link>
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">新規登録</Link>
      </div>
    </div>
  );
};

export default HomePage;
