/* eslint-disable no-console */
import { useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

import { CryptoState } from '../contexts/CryptoContext';
import useNavigate from '../shared/router/useNavigate';

const DB_URL = import.meta.env.VITE_DB_URL;

function DropdownMenu() {
  const [inputValue, setInputValue] = useState('');

  const { coins } = CryptoState();
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

  return (
    <Autocomplete
      autoHighlight
      id="saturday-check"
      options={coins}
      getOptionLabel={(option) => option.name}
      noOptionsText="No Results Found"
      onChange={(e, value) => handleOptionSelected(e, value)}
      renderInput={(params) => (
        <TextField
          {...params}
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
