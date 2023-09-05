import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import CryptoContext from './contexts/CryptoContext';
import CoinPage from './pages/CoinPage';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CryptoContext>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </BrowserRouter>
  </CryptoContext>,
);
