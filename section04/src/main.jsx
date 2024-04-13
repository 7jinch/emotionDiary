/**
 * src/main.jsx
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// index.html의 아이디가 root인 요소를 가져와서
// createRoot 메서드로 루트로 만들고
// App 컴포넌트를 렌더링함
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
