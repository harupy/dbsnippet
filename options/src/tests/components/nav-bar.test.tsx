import * as React from 'react';
import { shallow } from 'enzyme';

import { NavBar } from '#/components/nav-bar';

describe('HighlightPlaceholders', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <NavBar/>,
    );
    expect(wrapper).toHaveLength(1)
  }
}