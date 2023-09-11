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
  const [symbol, setSymbol] = useState('$');
  const [loading, setLoading] = useState(true);

  const currency = 'USD';

  useEffect(() => {
    const fetchData = async () => {
      const response = await coinsController.getCoinList();
      setCoins(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
  }, []);

  const contextValue = useMemo(() => ({
    coins,
    currency,
    symbol,
    loading,
  }), [coins, currency, symbol, loading]);

  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoProvider;
