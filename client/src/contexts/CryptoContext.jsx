import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

const Crypto = createContext();

export function CryptoState() {
  return useContext(Crypto);
}

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
  }, [currency]);

  const contextValue = useMemo(() => ({
    currency,
    setCurrency,
    symbol,
  }), [currency, symbol]);

  return (
    <Crypto.Provider value={contextValue}>
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;
