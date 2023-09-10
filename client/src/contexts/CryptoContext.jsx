import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import coinsController from '../controllers/coinsController';

const Crypto = createContext();

export function CryptoState() {
  return useContext(Crypto);
}

function CryptoContext({ children }) {
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
    <Crypto.Provider value={contextValue}>
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;
