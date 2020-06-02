import * as React from 'react';
import { shallow } from 'enzyme';

import { SelectAll } from '#/components/select-all';

describe('SelectAll', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SelectAll />);
    expect(wrapper).toHaveLength(1);
  });
});
