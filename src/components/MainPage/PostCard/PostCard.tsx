import React from 'react';

interface PostCardProps {
  description: string;
  modified_description: string;
  author: string;
}

const PostCard: React.FC<PostCardProps> = ({ description, modified_description, author }) => {
  return (
    <div className="post-card p-4 mb-4 border rounded shadow-lg bg-blue-100 h-64"> {/* カードの高さを大きめに設定 */}
      <h2 className="text-xl font-bold mb-2 break-words">{description.length > 50 ? description.slice(0, 50) + '...' : description}</h2>
      <p className="text-gray-700 mb-4 break-words">{modified_description.length > 50 ? modified_description.slice(0, 50) + '...' : modified_description}</p>
      <p className="text-gray-500 text-right">- {author}</p>
    </div>
  );
};

export default PostCard;
