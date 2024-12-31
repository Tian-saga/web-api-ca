import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // 检查是否存在 Token
  return token ? children : <Navigate to="/login" />; // 如果没有登录，跳转到登录页面
};

export default ProtectedRoute;
