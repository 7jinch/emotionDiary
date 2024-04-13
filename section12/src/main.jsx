/**
 * main.jsx
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // 리액트 라우터 불러오기
// BrowserRouter: 브라우저의 현재 주소를 감지해서 저장하는 역할

ReactDOM.createRoot(document.getElementById('root')).render(
  // App 컴포넌트를 감싸주기
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
