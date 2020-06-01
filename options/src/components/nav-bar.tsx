import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Constants } from '../constants';
import { GitHubLink, TweetLink } from './icon-links';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

export const NavBar: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            DBSnippet
          </Typography>
          <TweetLink text={Constants.REPO_URL} />
          <GitHubLink user={Constants.REPO_OWNER} repo={Constants.REPO_NAME} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
