import * as React from 'react';
import { shallow } from 'enzyme';

import { SaveButton } from '#/components/buttons';

describe('SaveButton', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SaveButton />);
    expect(wrapper).toHaveLength(1);
  });
});
