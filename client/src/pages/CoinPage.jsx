import { useEffect, useState } from 'react';

import {
  Container, Grid, LinearProgress, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import CoinInfo from '../components/CoinInfo';
import NavBar from '../components/NavBar';
import { CryptoState } from '../contexts/CryptoContext';
import coinsController from '../controllers/coinsController';
import numberWithCommas from '../utils/numberWithCommas';

function CoinPage() {
  const [coin, setCoin] = useState();

  const { id } = useParams();
  const { currency, symbol } = CryptoState();

  const fetchSingleCoin = async () => {
    const response = await coinsController.getSingleCoin(id)
      .then((data) => setCoin(data));
    return response;
  };

  useEffect(() => {
    fetchSingleCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  return (
    <div className="coinpage">
      <NavBar />
      <Container sx={{ marginTop: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="140"
                style={{ marginBottom: 20 }}
              />
              <Typography variant="h4">
                {coin?.name}
              </Typography>
              <div>
                <span style={{ display: 'flex' }}>
                  <Typography variant="h6">
                    Rank:
                  </Typography>
                    &nbsp; &nbsp;
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {numberWithCommas(coin?.market_cap_rank)}
                  </Typography>
                </span>

                <span style={{ display: 'flex' }}>
                  <Typography variant="h6">
                    Current Price:
                  </Typography>
                    &nbsp; &nbsp;
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {symbol}
                    {' '}
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()],
                    )}
                  </Typography>
                </span>
                <span style={{ display: 'flex' }}>
                  <Typography variant="h6">
                    Market Cap:
                  </Typography>
            &nbsp; &nbsp;
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {symbol}
                    {' '}
                    {numberWithCommas(
                      coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6),
                    )}
                    M
                  </Typography>
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md>
            <CoinInfo coin={coin} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CoinPage;
