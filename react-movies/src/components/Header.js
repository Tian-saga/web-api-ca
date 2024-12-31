import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token'); // 删除 Token
    localStorage.removeItem('username'); // 删除用户名
    navigate('/login'); // 跳转到登录页
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <h1>TMDB Client</h1>
      {username ? (
        <div>
          <span>Welcome, {username}</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </header>
  );
};

export default Header;
