import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    const fetchNightmare = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
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
    <div className="nightmare-detail">
      <h1>{nightmare.description}</h1>
      <p>{nightmare.modified_description}</p>
      <p>{nightmare.author}</p>
      <Link to="/mainPage" className="block text-center mt-6 text-blue-600 hover:text-blue-400 text-lg md:text-xl">
        一覧へ戻る
      </Link>
    </div>
  );
};

export default NightmareDetail;
