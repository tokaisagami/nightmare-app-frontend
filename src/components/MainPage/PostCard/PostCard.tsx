import React from 'react';

interface PostCardProps {
  title: string;
  content: string;
  author: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, author }) => {
  return (
    <div className="post-card p-4 mb-4 border border-gray-300 rounded shadow-lg bg-blue-50"> {/* カードを薄い青に設定 */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{content}</p>
      <p className="text-gray-500 text-right">- {author}</p>
    </div>
  );
};

export default PostCard;
