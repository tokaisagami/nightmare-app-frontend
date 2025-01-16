import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

interface Nightmare {
  id: number;
  description: string;
  modified_description: string;
  ending_category: string;
  published: boolean;
  created_at: string;
}

const MyPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [nightmares, setNightmares] = useState<Nightmare[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      const fetchNightmares = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/users/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setNightmares(data.nightmares);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching nightmares:', error);
          setLoading(false);
        }
      };

      fetchNightmares();
    }
  }, [user?.id]);

  const handleUnpublish = async (nightmareId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares/${nightmareId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: false }),
      });

      if (response.ok) {
        setNightmares(nightmares.map(nightmare =>
          nightmare.id === nightmareId ? { ...nightmare, published: false } : nightmare
        ));
      } else {
        console.error('Failed to update nightmare');
      }
    } catch (error) {
      console.error('Error updating nightmare:', error);
    }
  };

  const handlePublish = async (nightmareId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares/${nightmareId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: true }),
      });

      if (response.ok) {
        setNightmares(nightmares.map(nightmare =>
          nightmare.id === nightmareId ? { ...nightmare, published: true } : nightmare
        ));
      } else {
        console.error('Failed to update nightmare');
      }
    } catch (error) {
      console.error('Error updating nightmare:', error);
    }
  };

  // 修正: 削除機能
  const handleDelete = async (nightmareId: number) => {
    if (window.confirm("本当にこの悪夢を削除しますか？")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares/${nightmareId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setNightmares(nightmares.filter(nightmare => nightmare.id !== nightmareId));
        } else {
          console.error('Failed to delete nightmare');
        }
      } catch (error) {
        console.error('Error deleting nightmare:', error);
      }
    }
  };

  if (!user) {
    return <Loading />;
  }

  // レスポンシブ対応のためにCSSクラスを修正
  return (
    <div className="mypage flex flex-col items-center mt-8 px-4 md:px-8 w-full">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">マイページ</h1>
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        {/* ユーザー情報とアカウント設定の枠 */}
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-4 md:mb-0 md:mr-4 w-full md:w-1/3" style={{ maxHeight: '200px' }}>
          <p className="text-lg md:text-xl lg:text-lg mb-2">ユーザー名: {user?.name}</p>
          <p className="text-lg md:text-xl lg:text-lg mb-2">メール: {user?.email}</p>
          <div className="mt-4">
            <Link to="/account-settings" className="text-blue-500 hover:text-blue-700 font-KosugiMaru">アカウント設定へ</Link>
          </div>
        </div>
        {/* 投稿された悪夢内容の枠 */}
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-full md:w-2/3 overflow-y-scroll" style={{ maxHeight: '600px' }}>
          <h2 className="text-xl mb-2">投稿した悪夢内容：</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            nightmares.length === 0 ? (
              <p>投稿された悪夢はありません。</p>
            ) : (
              <ul>
                {nightmares.map(nightmare => (
                  <li key={nightmare.id} className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">{nightmare.description}</h3>
                    <p className="text-sm text-gray-600">{nightmare.modified_description}</p>
                    <p className="text-sm">
                      カテゴリ: {
                        nightmare.ending_category === 'happy_end'
                          ? 'ハッピーエンド'
                          : nightmare.ending_category === 'unexpected_end'
                            ? '予想外の結末'
                            : 'その他'
                      }
                    </p>
                    <p className="text-sm">公開: {nightmare.published ? '公開中' : '非公開'}</p>
                    <p className="text-sm">投稿日時: {new Date(nightmare.created_at).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                    {nightmare.published ? (
                      <button
                        onClick={() => handleUnpublish(nightmare.id)}
                        className="mt-2 bg-red-500 text-white font-KosugiMaru px-4 py-2 rounded mr-2"
                      >
                        非公開にする
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePublish(nightmare.id)}
                        className="mt-2 bg-green-500 text-white font-KosugiMaru px-4 py-2 rounded mr-2"
                      >
                        公開にする
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(nightmare.id)}
                      className="mt-2 bg-gray-500 text-white font-KosugiMaru px-4 py-2 rounded"
                    >
                      削除
                    </button>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
