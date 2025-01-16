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

  return (
    <div className="mypage flex flex-col justify-center items-center mt-8 px-4 md:px-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">マイページ</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-2">ユーザー名: {user?.name}</p>
        <p className="text-lg md:text-xl lg:text-2xl mb-2">メール: {user?.email}</p>
        <div className="mt-4 text-center">
          <Link to="/account-settings" className="text-blue-500 hover:text-blue-700 font-KosugiMaru">アカウント設定へ</Link> {/* 新しいリンクの追加 */}
        </div>
        <div>
          <h2 className="text-xl mt-4 mb-2">投稿した悪夢内容：</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            nightmares.length === 0 ? (
              <p>投稿された悪夢はありません。</p>
            ) : (
              <ul>
                {nightmares.map(nightmare => (
                  <li key={nightmare.id} className="mb-4">
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
                    {/* 修正: 削除ボタン */}
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
        <div className="mt-4 text-center">
          <Link to="/mainPage" className="text-blue-500 hover:text-blue-700 font-KosugiMaru">メインページへ</Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
