import React, { useEffect, useState } from 'react';
import PostCard from './PostCard/PostCard';

interface Post {
  title: string;
  content: string;
  author: string;
}

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
        {posts.map((post, index) => (
          <PostCard key={index} title={post.title} content={post.content} author={post.author} />
        ))}
      </main>
      <footer className="main-footer">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default MainPage;
