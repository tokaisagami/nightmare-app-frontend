// src/components/Header/Header.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl">My App</h1>
      {isLoggedIn ? (
        <nav>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/logout" onClick={() => dispatch(logout())}>Logout</a></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
