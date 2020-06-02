import * as React from 'react';
import { shallow } from 'enzyme';

import { ExportButton } from '#/components/buttons';

describe('ExportButton', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ExportButton />);
    expect(wrapper).toHaveLength(1);
  });
});
