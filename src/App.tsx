import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Providers from './providers';
import Routes from './routes/Routes';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
