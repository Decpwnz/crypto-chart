import { TextField } from '@mui/material';

function SearchBar({ handleSearchValue }) {
  return (
    <TextField
      label="Search for a crypto"
      variant="outlined"
      style={{ marginBottom: 20, width: '100%' }}
      onChange={handleSearchValue}
      inputProps={{
        maxLength: 30,
      }}
    />
  );
}

export default SearchBar;
