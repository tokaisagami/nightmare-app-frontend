import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Header from './components/Header/Header';
import UserSignupPage from './components/Signup/UserSignupPage';
import MainPage from './components/MainPage/MainPage';
import NightmareDetail from './components/MainPage/NightmareDetail';
import InputNightmare from './components/MainPage/InputNightmare';
import DisplayNightmare from './components/MainPage/DisplayNightmare';
import HomePage from './components/HomePage/HomePage';
import MyPage from './components/MyPage/MyPage';
import { login } from './store/slices/authSlice';

const routes = [
  { path: '/', element: <HomePage /> }, 
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <UserSignupPage /> },
  { path: '/mainPage', element: <MainPage /> },
  { path: '/nightmares/:id', element: <NightmareDetail /> },
  { path: '/input-nightmare', element: <InputNightmare /> },
  { path: '/modified-nightmare', element: <DisplayNightmare /> },
  { path: '/mypage', element: <MyPage /> },
];

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      const userId = payload.user_id; // トークンのペイロードからユーザーIDを取得
  
      // バックエンドからユーザー情報を取得
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          const user = { name: data.name, email: data.email };
          console.log(user); // ここでユーザー情報を確認
          dispatch(login(user)); // ユーザー情報を渡してログイン状態を更新
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [dispatch]);
    
  return (
    <Router>
      <div className="min-h-screen">
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
