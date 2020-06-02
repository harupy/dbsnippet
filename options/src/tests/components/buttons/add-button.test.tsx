import * as React from 'react';
import { shallow } from 'enzyme';

import { AddButton } from '#/components/buttons';

describe('AddButton', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AddButton />);
    expect(wrapper).toHaveLength(1);
  });
});
