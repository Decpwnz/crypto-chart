/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

import coinsController from '../controllers/coinsController';
import useNavigate from '../shared/router/useNavigate';

const DB_URL = import.meta.env.VITE_DB_URL;

function DropdownMenu() {
  const [coin, setCoin] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { goTo } = useNavigate();

  const handleOptionSelected = (event, option) => {
    setInputValue(event.target.value);

    if (option) {
      axios.post(DB_URL, {
        action: 'Menu Select', currency: option.id, timestamp: new Date(),
      })
        .then((response) => {
          console.log('Log data sent successfully:', response.data);
        })
        .catch((err) => {
          console.error('Error sending log data:', err);
        });
      goTo(`/coins/${option.id}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await coinsController.getCoinList();
      setCoin(response);
    };
    fetchData();
  }, []);

  return (
    <Autocomplete
      autoHighlight
      id="saturday-check"
      options={coin}
      getOptionLabel={(option) => option.name}
      noOptionsText="No Results Found"
      onChange={(e, value) => handleOptionSelected(e, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={handleOptionSelected}
          label="Select Coin"
          value={inputValue}
          inputProps={{
            ...params.inputProps,
            maxLength: 30,
          }}
        />
      )}
    />
  );
}

export default DropdownMenu;
