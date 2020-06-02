import * as React from 'react';
import { shallow } from 'enzyme';

import { SnippetRow } from '#/components/snippet-row';

describe('SnippetRow', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SnippetRow prefix="foo" body="bar" index={0} />);
    expect(wrapper).toHaveLength(1);
  });
});
