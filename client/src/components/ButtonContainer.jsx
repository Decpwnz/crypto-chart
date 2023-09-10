/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { Alert, Container, Grid } from '@mui/material';
import axios from 'axios';

import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';
import { CryptoState } from '../contexts/CryptoContext';
import useNavigate from '../shared/router/useNavigate';

const DB_URL = import.meta.env.VITE_DB_URL;
const MAX_INPUT_LENGTH = 30;

function ButtonContainer() {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);

  const { coins } = CryptoState();
  const { goTo } = useNavigate();

  const validName = coins
    .map((value) => value.name.toLowerCase())
    .filter((value) => searchValue === value);

  useEffect(() => {
    if (searchValue.length >= MAX_INPUT_LENGTH) {
      setError(true);
    } else {
      setError(false);
    }
  }, [searchValue]);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleButtonClick = () => {
    axios.post(DB_URL, {
      action: 'Input Search', currency: searchValue, timestamp: new Date(),
    })
      .then((response) => {
        console.log('Log data sent successfully:', response.data);
      })
      .catch((err) => {
        console.error('Error sending log data:', err);
      });
    if (validName) goTo(`/coins/${validName}`);
  };

  return (
    <Container maxWidth="lg" className="button-container">
      <div className="button-container__inner">
        <Alert style={{ visibility: error ? 'visible' : 'hidden', width: '300px', marginBot: '5px' }} severity="error">Input is too long</Alert>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DropdownMenu />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SearchBar error={error} handleSearchValue={handleSearchValue} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <SearchButton handleButtonClick={handleButtonClick} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ButtonContainer;
