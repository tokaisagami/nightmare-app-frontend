import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DisplayNightmare: React.FC = () => {
  const location = useLocation();
  const { modified_description, description, ending_category } = location.state;
  const [showModal, setShowModal] = useState(false);
  const [nightmareId, setNightmareId] = useState<number | null>(null); // 追加

  const handlePost = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        description: description,
        modified_description: modified_description,
        ending_category: parseInt(ending_category, 10), // 文字列から整数に変換
        published: true
      })
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }

    const data = await response.json();
    setNightmareId(data.id); // 投稿したナイトメアのIDを保存
    setShowModal(true);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=改変された悪夢を共有します！&url=${import.meta.env.VITE_APP_DOMAIN_NAME}/nightmares/${nightmareId}`;

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="bg-green-100 shadow-lg p-6 rounded-lg w-[95%] mx-auto border border-gray-300">
        <h1 className="text-2xl font-bold mb-4">改変された悪夢内容</h1>
        <p className="whitespace-pre-wrap">{modified_description}</p>
        <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          投稿する
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p>悪夢内容を投稿しました！</p>
            <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              閉じる
            </button>
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
            >
              X（元Twitter）で共有する
            </a>
          </div>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link to="/mainPage" className="text-blue-500 hover:text-blue-700">メインページへ</Link>
      </div>
    </div>
  );
};

export default DisplayNightmare;
