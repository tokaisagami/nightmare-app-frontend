import React, { useEffect, useState } from 'react';
import PostCard from './PostCard/PostCard';

interface Nightmare {
  description: string;
  modified_description: string;
  author: string;
}

const MainPage: React.FC = () => {
  const [nightmares, setNightmares] = useState<Nightmare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNightmares = async () => {
      const token = localStorage.getItem('authToken'); // ローカルストレージからトークンを取得
      console.log('Token:', token);
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 認証トークンをヘッダーに追加
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
    <div className="main-page">
      <header className="main-header">
        <h1>Welcome to the Main Page</h1>
      </header>
      <main className="main-content">
        {nightmares.map((nightmare, index) => (
          <PostCard
            key={index}
            title={nightmare.description}
            content={nightmare.modified_description}
            author={nightmare.author}
          />
        ))}
      </main>
      <footer className="main-footer">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default MainPage;
