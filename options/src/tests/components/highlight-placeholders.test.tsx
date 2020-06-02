import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { HighlightPlaceholders } from '#/components/highlight-placeholders';
import { ByDataTestId } from '#/utils';

describe('HighlightPlaceholders', () => {
  let wrapper: ReactWrapper;
  const backgroundColor = 'blue';

  it('Single placeholder', () => {
    wrapper = mount(
      <HighlightPlaceholders
        body="func(${x})"
        backgroundColor={backgroundColor}
      />,
    );

    expect(wrapper.text()).toEqual('func(x)');
    expect(wrapper.find(ByDataTestId('highlight')).text()).toEqual('x');
    wrapper.find(ByDataTestId('highlight')).forEach(node => {
      expect(node.prop('style')).toHaveProperty(
        'backgroundColor',
        backgroundColor,
      );
    });
  });

  it('Multiple placeholder', () => {
    wrapper = mount(
      <HighlightPlaceholders
        body="func(${x}, ${x})"
        backgroundColor={backgroundColor}
      />,
    );

    expect(wrapper.text()).toEqual('func(x, x)');
    expect(wrapper.find(ByDataTestId('highlight')).map(w => w.text())).toEqual([
      'x',
      'x',
    ]);
    wrapper.find(ByDataTestId('highlight')).forEach(node => {
      expect(node.prop('style')).toHaveProperty(
        'backgroundColor',
        backgroundColor,
      );
    });
  });

  it('No placeholder', () => {
    wrapper = mount(
      <HighlightPlaceholders body="func()" backgroundColor={backgroundColor} />,
    );

    expect(wrapper.text()).toEqual('func()');
    expect(wrapper.find(ByDataTestId('highlight'))).toHaveLength(0);
  });
});
