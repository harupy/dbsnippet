import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar: React.FC<{}> = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">DBSnippet</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
