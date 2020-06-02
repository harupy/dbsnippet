import * as React from 'react';
import { shallow } from 'enzyme';

import { SelectSingle } from '#/components/select-single';

describe('SelectSingle', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SelectSingle index={0} />);
    expect(wrapper).toHaveLength(1);
  });
});
