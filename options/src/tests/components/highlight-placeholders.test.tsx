import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { HighlightPlaceholders } from '#/components/highlight-placeholders';

describe('HighlightPlaceholders', () => {
  let wrapper: ReactWrapper;

  it('Single placeholder', () => {
    wrapper = mount(
      <HighlightPlaceholders body="func(${x})" backgroundColor="blue" />,
    );

    expect(wrapper.text()).toEqual('func(x)');
    expect(wrapper.find('[data-testid="highlight"]').text()).toEqual('x');
  });

  it('Multiple placeholder', () => {
    wrapper = mount(
      <HighlightPlaceholders body="func(${x}, ${x})" backgroundColor="blue" />,
    );

    expect(wrapper.text()).toEqual('func(x, x)');
    expect(
      wrapper.find('[data-testid="highlight"]').map(w => w.text()),
    ).toEqual(['x', 'x']);
  });

  it('No placeholder', () => {
    wrapper = mount(
      <HighlightPlaceholders body="func()" backgroundColor="blue" />,
    );

    expect(wrapper.text()).toEqual('func()');
    expect(wrapper.find('[data-testid="highlight"]')).toHaveLength(0);
  });
});
