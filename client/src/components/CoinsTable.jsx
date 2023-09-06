/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';

import { CryptoState } from '../contexts/CryptoContext';
import coinsController from '../controllers/coinsController';
import useNavigate from '../shared/router/useNavigate';
import numberWithCommas from '../utils/numberWithCommas';

const DB_URL = import.meta.env.VITE_DB_URL;
const tableHead = ['Coin', 'Price', '24h Change', 'Market Cap'];

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { symbol } = CryptoState();
  const { goTo } = useNavigate();

  const fetchCoinList = async () => {
    setLoading(true);
    const response = await coinsController.getCoinList()
      .then((data) => setCoins(data));
    setLoading(false);
    return response;
  };

  useEffect(() => {
    fetchCoinList();
  }, []);

  const handleCryptoSelected = (value) => {
    axios.post(DB_URL, {
      action: 'Table Select', currency: value, timestamp: new Date(),
    })
      .then((response) => {
        console.log('Log data sent successfully:', response.data);
      })
      .catch((err) => {
        console.error('Error sending log data:', err);
      });
    if (value) goTo(`/coins/${value}`);
  };

  return (
    <Container style={{ textAlign: 'center' }}>
      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: 'gold' }} />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: '#D2DAFF' }}>
              <TableRow>
                {tableHead.map((value) => (
                  <TableCell
                    style={{
                      color: 'black',
                      fontWeight: '700',
                      fontFamily: 'Montserrat',
                    }}
                    key={value}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coins
                .map((row) => (
                  <TableRow
                    onClick={() => handleCryptoSelected(row.id)}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: 'flex',
                        gap: 15,
                      }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />
                      <div
                        style={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: 'darkgrey' }}>
                          {row.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {symbol}
                      {' '}
                      {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      style={{
                        color: row.market_cap_change_percentage_24h > 0 ? 'green' : 'red',
                        fontWeight: 500,
                      }}
                    >
                      {row.market_cap_change_percentage_24h.toFixed(2)}
                      %
                    </TableCell>
                    <TableCell>
                      {symbol}
                      {' '}
                      {numberWithCommas(
                        row.market_cap.toString().slice(0, -6),
                      )}
                      M
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
}

export default CoinsTable;
