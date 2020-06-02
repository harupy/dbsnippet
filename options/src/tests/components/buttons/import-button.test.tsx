import * as React from 'react';
import { shallow } from 'enzyme';

import { ImportButton } from '#/components/buttons';

describe('ImportButton', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ImportButton />);
    expect(wrapper).toHaveLength(1);
  });
});
