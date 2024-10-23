import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaceholderPage from './PlaceholderPage';
import LoginPage from './components/Login/LoginPage';
import Header from './components/Header/Header';
import UserSignupPage from './components/Signup/UserSignupPage';
import MainPage from './components/MainPage/MainPage';
import NightmareDetail from './components/MainPage/NightmareDetail';
import { login } from './store/slices/authSlice';

const routes = [
  { path: '/placeholder', element: <PlaceholderPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <UserSignupPage /> },
  { path: '/nightmares/:id', element: <NightmareDetail /> },
  { path: '/mainPage', element: <MainPage /> },
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(login()); // トークンが存在する場合にログイン状態を更新
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
