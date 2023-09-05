import { Button } from '@mui/material';

function SearchButton({ handleButtonClick }) {
  return (
    <Button
      style={{ backgroundColor: '#BEADFA', height: '50px' }}
      fullWidth
      variant="contained"
      onClick={handleButtonClick}
    >
      Search
    </Button>
  );
}

export default SearchButton;
