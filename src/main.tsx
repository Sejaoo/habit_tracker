import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import sprite from './assets/daily-basis-sprite.svg?raw';

const div = document.createElement('div');
div.style.display = 'none';
div.innerHTML = sprite;
document.body.appendChild(div);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
