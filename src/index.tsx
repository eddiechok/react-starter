// organize-imports-ignore
import './http/axios';
import './translation/i18n';
import './translation/validation-setup';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
