import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // useNavigateを追加

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
  const navigate = useNavigate(); // navigateを追加

  useEffect(() => {
    const fetchNightmare = async () => {
      const token = localStorage.getItem('authToken');
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

  const handleRedirect = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/mainPage'); // ログインしている場合はメインページへ
    } else {
      navigate('/'); // ログインしていない場合はHOMEページへ
    }
  };

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
      <button onClick={handleRedirect} className="block text-center mt-6 text-blue-600 hover:text-blue-400 text-lg md:text-xl">
        一覧へ戻る
      </button>
    </div>
  );
};

export default NightmareDetail;
