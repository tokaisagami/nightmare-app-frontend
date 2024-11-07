import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // トークンをローカルストレージから削除
    dispatch(logout()); // ログイン状態を更新
    navigate('/login'); // ログインページに遷移
  };

  return (
    <header className="bg-purple-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Nigtmare-app</h1>
      {isLoggedIn ? (
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a className="hover:text-gray-400" href="/mypage">マイページ</a>
            </li>
            <li>
              <button className="hover:text-gray-400" onClick={handleLogout}>ログアウト</button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="flex space-x-4">
            <li><a className="hover:text-gray-400" href="/login">ログイン</a></li>
            {/* <li><a className="hover:text-gray-400" href="/signup">ゲストログイン</a></li> */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
