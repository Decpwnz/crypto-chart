import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import coinsController from '../controllers/coinsController';

const CryptoContext = createContext();

export function CryptoState() {
  return useContext(CryptoContext);
}

function CryptoProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    const fetchData = async () => {
      const response = await coinsController.getCoinList();
      setCoins(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
  }, [currency]);

  const contextValue = useMemo(() => ({
    coins,
    setCoins,
    currency,
    setCurrency,
    symbol,
  }), [coins, currency, symbol]);

  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoProvider;
