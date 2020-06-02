import * as React from 'react';
import { shallow } from 'enzyme';

import { DeleteButton } from '#/components/buttons';

describe('DeleteButton', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<DeleteButton />);
    expect(wrapper).toHaveLength(1);
  });
});
