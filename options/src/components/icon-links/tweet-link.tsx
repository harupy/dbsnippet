import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles({
  button: {
    padding: 6,
    margin: 1.5,
  },
});

interface TweetLinkProps {
  text: string;
}

export const TweetLink: React.FC<TweetLinkProps> = ({ text }) => {
  const classes = useStyles();
  const href = `https://twitter.com/intent/tweet?text=${text}`;
  return (
    <Button variant="contained" href={href} className={classes.button}>
      <TwitterIcon />
    </Button>
  );
};
