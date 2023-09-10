import {
  AppBar, Box, Toolbar, Typography,
} from '@mui/material';

import useNavigate from '../shared/router/useNavigate';

function NavBar() {
  const { goTo } = useNavigate();

  const handleTypographyClick = () => {
    goTo('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar className="navbar-toolbar">
          <div className="navbar-div-title">
            <Typography
              onClick={handleTypographyClick}
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontFamily: 'Montserrat',
              }}
            >
              Crypto Chart App
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
