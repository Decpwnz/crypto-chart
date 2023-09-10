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

  useEffect(() => {
    const fetchSingleCoin = async () => {
      const response = await coinsController.getSingleCoin(id);
      setCoin(response);
      return response;
    };
    fetchSingleCoin();
  }, []);

  if (!coin) return <LinearProgress />;

  return (
    <div className="coinpage">
      <NavBar />
      <Container className="container-grid">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div>
              <img
                className="coin-image"
                src={coin?.image.large}
                alt={coin?.name}
              />
              <Typography variant="h4">
                {coin?.name}
              </Typography>
              <div>
                <span className="span">
                  <Typography variant="h6">
                    Rank:
                  </Typography>
                  <Typography
                    className="font"
                    variant="h6"
                  >
                    {numberWithCommas(coin?.market_cap_rank)}
                  </Typography>
                </span>

                <span className="span">
                  <Typography variant="h6">
                    Current Price:
                  </Typography>
                  <Typography
                    className="font"
                    variant="h6"
                  >
                    {symbol}
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()],
                    )}
                  </Typography>
                </span>
                <span className="span">
                  <Typography variant="h6">
                    Market Cap:
                  </Typography>
                  <Typography
                    className="font"
                    variant="h6"
                  >
                    {symbol}
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
