import React from 'react';

interface PostCardProps {
  description: string;
  modified_description: string;
  author: string;
  ending_category: string; // 文字列型に変更
}

const PostCard: React.FC<PostCardProps> = ({ description, modified_description, author, ending_category }) => {
  // サムネイル画像の決定
  const endingImage = {
    happy_end: 'src/assets/nightmare-card/HAPPY-END.png',
    unexpected_end: 'src/assets/nightmare-card/unexpected-end.png'
  }[ending_category];

  // ending_categoryに基づく表示内容を決定
  const endingText = {
    happy_end: 'ハッピーエンド',
    unexpected_end: '予想外の結末',
    bad_end: 'バッドエンド'
  }[ending_category] || '不明';

  return (
    <div className="post-card p-4 mb-4 border rounded-xl shadow-lg bg-white h-full">
      {endingImage && <img src={endingImage} alt="サムネイル" className="mx-auto mb-4" />}
      <h3 className="text-xl md:text-xl lg:text-xl font-semibold text-center mb-4">{author}さんの悪夢</h3>
      <p className="text-sm border-l-4 border-green-300 pl-4 text-gray-700 mb-4">{endingText}</p>
    </div>
  );
};

export default PostCard;
