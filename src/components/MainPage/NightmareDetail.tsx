import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Nightmare {
  id: number;
  description: string;
  modified_description: string;
  author: string;
}

const NightmareDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nightmare, setNightmare] = useState<Nightmare | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // 認証状態を管理

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // トークンが存在する場合は認証済みとする
    }

    const fetchNightmare = async () => {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares/${id}`, {
          headers: headers
        });
        if (!response.ok) {
          throw new Error('Failed to fetch nightmare');
        }
        const data = await response.json();
        setNightmare(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNightmare();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!nightmare) {
    return <div>No nightmare found</div>;
  }

  return (
    <div className="nightmare-detail flex flex-col justify-center items-center mt-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 font-zenKurenaido">{nightmare.author}さんの悪夢</h1>
        <h3 className="text-lg font-semibold mb-2">悪夢内容：</h3>
        <p className="border-l-4 border-rose-400 pl-4 text-gray-700 text-base md:text-lg lg:text-xl mb-2 break-words">{nightmare.description}</p>
        <h3 className="text-lg font-semibold mb-2">改変された結末：</h3>
        <p className="border-l-4 border-indigo-400 pl-4 text-gray-700 text-base md:text-lg lg:text-xl mb-2 break-words">{nightmare.modified_description}</p>
      </div>
      {isAuthenticated ? (
        <Link to="/mainPage" className="block text-center mt-6 text-blue-600 hover:text-blue-400 text-lg md:text-xl">
          一覧へ戻る
        </Link>
      ) : (
        <Link to="/" className="block text-center mt-6 text-blue-600 hover:text-blue-400 text-lg md:text-xl">
          新規登録へ
        </Link>
      )}
    </div>
  );
};

export default NightmareDetail;
