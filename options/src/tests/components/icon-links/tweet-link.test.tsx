import * as React from 'react';
import { shallow } from 'enzyme';

import { TweetLink } from '#/components/icon-links/tweet-link';

describe('GitHubLink', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<TweetLink text="foo" />);
    expect(wrapper).toHaveLength(1);
  });
});
