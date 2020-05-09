import * as React from 'react';

interface StarCounterProps {
  user: string;
  repo: string;
}

const GitHubLink: React.FC<StarCounterProps> = ({ user, repo }) => {
  return (
    <iframe
      src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=true&size=large`}
      frameBorder="0"
      scrolling="0"
      width="120px"
      height="30"
    ></iframe>
  );
};

export default GitHubLink;
