import React from 'react';

interface PostCardProps {
  description: string;
  modified_description: string;
  author: string;
  ending_category: string; // 文字列型に変更
}

const PostCard: React.FC<PostCardProps> = ({ description, modified_description, author, ending_category }) => {
  // ending_categoryに基づく表示内容を決定
  const endingText = {
    happy_end: 'ハッピーエンド',
    unexpected_end: '予想外の結末',
    bad_end: 'バッドエンド'
  }[ending_category] || '不明';

  return (
    <div className="post-card p-4 mb-4 border rounded-xl shadow-lg bg-white h-full">
      <h3 className="text-2xl md:text-3xl lg:text-2xl font-semibold text-center mb-4">{author}さんの悪夢</h3>
      <h3 className="text-lg font-semibold mb-1">悪夢内容：</h3>
      <p className="border-l-4 border-rose-300 pl-4 text-left mb-4 break-words">{description.length > 50 ? description.slice(0, 50) + '...' : description}</p>
      <h3 className="text-lg font-semibold mb-1">結末：</h3>
      <p className="border-l-4 border-green-300 pl-4 text-gray-700 mb-4">{endingText}</p>
    </div>
  );
};

export default PostCard;
