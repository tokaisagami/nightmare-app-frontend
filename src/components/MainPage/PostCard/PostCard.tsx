import React from 'react';

interface PostCardProps {
  description: string;
  modified_description: string;
  author: string;
}

const PostCard: React.FC<PostCardProps> = ({ description, modified_description, author }) => {
  return (
    <div className="post-card p-4 mb-4 border rounded-xl shadow-lg bg-white h-full">
      <h3 className="text-2xl md:text-3xl lg:text-2xl font-semibold text-center mb-4">{author}さんの悪夢</h3>
      <h3 className="text-lg font-semibold mb-1">悪夢内容：</h3>
      <p className="border-l-4 border-rose-300 pl-4 text-left mb-4 break-words">{description.length > 50 ? description.slice(0, 50) + '...' : description}</p>
      <h3 className="text-lg font-semibold mb-1">改変された結末：</h3>
      <p className="border-l-4 border-indigo-300 pl-4 text-gray-700 mb-4 break-words">{modified_description.length > 50 ? modified_description.slice(0, 50) + '...' : modified_description}</p>
    </div>
  );
};

export default PostCard;
