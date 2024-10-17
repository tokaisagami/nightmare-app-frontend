import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <header className="bg-purple-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Nigtmare-app</h1>
      {isLoggedIn ? (
        <nav>
          <ul className="flex space-x-4">
            <li><a className="hover:text-gray-400" href="/dashboard">Dashboard</a></li>
            <li><a className="hover:text-gray-400" href="/logout" onClick={() => dispatch(logout())}>Logout</a></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="flex space-x-4">
            <li><a className="hover:text-gray-400" href="/login">ログイン</a></li>
            <li><a className="hover:text-gray-400" href="/signup">ゲストログイン</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
