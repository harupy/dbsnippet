import * as React from 'react';
import { shallow } from 'enzyme';

import { GitHubLink } from '#/components/icon-links/github-link';

describe('GitHubLink', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<GitHubLink user="harupy" repo="dbsnippet" />);
    expect(wrapper).toHaveLength(1);
  });
});
