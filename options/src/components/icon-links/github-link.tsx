import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  icon: {
    marginRight: 5,
  },
  button: {
    textTransform: 'none',
    padding: 6,
    margin: 1.5,
  },
});

interface GitHubLinkProps {
  user: string;
  repo: string;
}

export const GitHubLink: React.FC<GitHubLinkProps> = ({ user, repo }) => {
  const [starCount, setStarCount] = React.useState<number | undefined>();
  const classes = useStyles();

  // Fetch stargazers count GitHub using the GitHub REST API.
  const fetchStarCount = async (): Promise<void> => {
    const resp = await fetch(`https://api.github.com/repos/${user}/${repo}`);

    if (!resp.ok) {
      throw new Error(`${resp.status} ${resp.statusText}`);
    }

    const { stargazers_count: stargazersCount } = await resp.json();
    setStarCount(stargazersCount);
  };

  React.useEffect(() => {
    fetchStarCount();
  }, []);

  if (starCount === undefined) {
    return null;
  }

  return (
    <Button
      variant="contained"
      className={classes.button}
      href={`https://github.com/${user}/${repo}`}
    >
      <GitHubIcon className={classes.icon} />
      {`Star : ${starCount}`}
    </Button>
  );
};
