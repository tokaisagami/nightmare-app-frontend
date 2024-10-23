import React, { useEffect, useState } from 'react';
import PostCard from './PostCard/PostCard';
import { Link } from 'react-router-dom';

interface Nightmare {
  id: number;
  description: string;
  modified_description: string;
  author: string;
}

const MainPage: React.FC = () => {
  const [nightmares, setNightmares] = useState<Nightmare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // 現在のページに表示する投稿を計算
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNightmares = nightmares.slice(indexOfFirstPost, indexOfLastPost);

  // ページ変更ハンドラー
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchNightmares = async () => {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch nightmares');
        }
        const data = await response.json();
        setNightmares(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNightmares();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center mt-8"> {/* 上にマージンを追加 */}
      <div className="bg-pink-100 shadow-lg p-6 rounded-lg w-[95%] mx-auto border border-gray-300"> {/* 大きな枠を薄いピンクに設定 */}
        <header className="main-header text-center mb-6">
          <h1 className="text-2xl font-bold">救済された悪夢たち</h1>
        </header>
        <main className="grid grid-cols-3 gap-4"> {/* 3列に設定 */}
          {currentNightmares.map((nightmare) => (
            <Link key={nightmare.id} to={`/nightmares/${nightmare.id}`}>
              <PostCard
                description={nightmare.description.length > 50 ? nightmare.description.substring(0, 50) + '...' : nightmare.description}
                modified_description={nightmare.modified_description}
                author={nightmare.author}
              />
            </Link>
          ))}
        </main>
        <nav className="mt-4">
          <ul className="pagination flex justify-center">
            {Array.from({ length: Math.ceil(nightmares.length / postsPerPage) }, (_, index) => (
              <li key={index} className="page-item mx-1">
                <button onClick={() => paginate(index + 1)} className="page-link border border-gray-300 px-3 py-1 rounded">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
