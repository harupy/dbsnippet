import * as React from 'react';
import { shallow } from 'enzyme';

import { UpdateSingle } from '#/components/update-single';

describe('UpdateSingle', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<UpdateSingle keyName="prefix" index={0} />);
    expect(wrapper).toHaveLength(1);
  });
});
