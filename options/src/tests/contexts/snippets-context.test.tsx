import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SetState, ObjStr, SnippetItem } from '#/types';
import { FromObj, ToObj } from '#/components/chrome';

import {
  objToSnippets,
  snippetsToObj,
  SnippetsContext,
  SnippetsProvider,
} from '../../contexts/snippets-context';

describe('snippets-context', () => {
  const obj = {
    foo: 'bar',
    yes: 'no',
  };
  const snippets = [
    { prefix: 'foo', body: 'bar', selected: false },
    { prefix: 'yes', body: 'no', selected: false },
  ];

  it('objToSnippets', () => {
    expect(objToSnippets(obj)).toEqual(snippets);
    expect(objToSnippets({})).toEqual([]);
  });

  it('snippetsToObj', () => {
    expect(snippetsToObj(snippets)).toEqual(obj);
    expect(snippetsToObj([])).toEqual({});
  });
});

const Provider: React.FC<{
  children: React.ReactNode;
  storageItems: ObjStr;
}> = ({ children, storageItems }): JSX.Element => {
  function useChromeStorageSyncGet<T>(
    setter: SetState<T>,
    fromObj: FromObj<T>,
  ): { (): void } {
    return function f(): void {
      setter(fromObj(storageItems));
    };
  }

  function useChromeStorageSyncSet<T>(toObj: ToObj<T>): { (t: T): void } {
    return function f(t: T): void {
      toObj(t);
    };
  }

  return (
    <>
      <SnippetsProvider
        useChromeStorageSyncGet={useChromeStorageSyncGet}
        useChromeStorageSyncSet={useChromeStorageSyncSet}
      >
        {children}
      </SnippetsProvider>
      ,
    </>
  );
};

const Button: React.FC<{ dataTestId: string; onClick: () => void }> = ({
  dataTestId,
  onClick,
}) => {
  return (
    <button
      type="button"
      aria-label="label"
      data-testid={dataTestId}
      onClick={onClick}
    />
  );
};

const ByDataTestId = (id: string): string => {
  return `[data-testid="${id}"]`;
};

const getSnippets = (w: ReactWrapper): SnippetItem[] => {
  return JSON.parse(w.find(ByDataTestId('snippets')).text());
};

describe('SnippetsContext', () => {
  let wrapper: ReactWrapper;
  let expectedSnippets: SnippetItem[];
  // let storageItems;

  it('test', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets } = React.useContext(SnippetsContext);
      return <div data-testid="snippets">{JSON.stringify(snippets)}</div>;
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar' }}>
        <Component />
      </Provider>,
    );

    expectedSnippets = [{ prefix: 'foo', body: 'bar', selected: false }];

    expect(JSON.parse(wrapper.find(ByDataTestId('snippets')).text())).toEqual(
      expectedSnippets,
    );
  });

  it('addSnippet', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets, addSnippet } = React.useContext(SnippetsContext);
      return (
        <div>
          <div data-testid="snippets">{JSON.stringify(snippets)}</div>
          <Button
            dataTestId="addSnippet"
            onClick={
              // eslint-disable-next-line react/jsx-curly-newline
              (): void =>
                addSnippet?.({ prefix: 'yes', body: 'no', selected: false })
            }
          />
        </div>
      );
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar' }}>
        <Component />
      </Provider>,
    );

    wrapper.find(ByDataTestId('addSnippet')).simulate('click');

    expectedSnippets = [
      { prefix: 'foo', body: 'bar', selected: false },
      { prefix: 'yes', body: 'no', selected: false },
    ];
    expect(getSnippets(wrapper)).toEqual(expectedSnippets);
  });

  it('selectSnippet', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets, selectSnippet } = React.useContext(SnippetsContext);
      return (
        <div>
          <div data-testid="snippets">{JSON.stringify(snippets)}</div>
          <Button
            dataTestId="selectSnippet"
            onClick={(): void => selectSnippet?.(true, 0)}
          />
        </div>
      );
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar' }}>
        <Component />
      </Provider>,
    );

    wrapper.find(Button).find(ByDataTestId('selectSnippet')).simulate('click');
    expectedSnippets = [{ prefix: 'foo', body: 'bar', selected: true }];
    expect(getSnippets(wrapper)).toEqual(expectedSnippets);
  });

  it('deleteSnippet', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets, deleteSnippet } = React.useContext(SnippetsContext);
      return (
        <div>
          <div data-testid="snippets">{JSON.stringify(snippets)}</div>
          <Button
            dataTestId="deleteSnippet"
            onClick={(): void => deleteSnippet?.(0)}
          />
        </div>
      );
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar' }}>
        <Component />
      </Provider>,
    );

    wrapper.find(ByDataTestId('deleteSnippet')).simulate('click');
    expectedSnippets = [];
    expect(getSnippets(wrapper)).toEqual(expectedSnippets);
  });

  it('deleteSelected', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets, selectSnippet, deleteSelected } = React.useContext(
        SnippetsContext,
      );
      return (
        <div>
          <div data-testid="snippets">{JSON.stringify(snippets)}</div>
          <Button
            dataTestId="selectSnippet"
            onClick={(): void => selectSnippet?.(true, 0)}
          />
          <Button
            dataTestId="deleteSelected"
            onClick={(): void => deleteSelected?.()}
          />
        </div>
      );
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar', yes: 'no' }}>
        <Component />
      </Provider>,
    );

    wrapper.find(ByDataTestId('selectSnippet')).simulate('click');
    wrapper.find(ByDataTestId('deleteSelected')).simulate('click');
    expectedSnippets = [{ prefix: 'yes', body: 'no', selected: false }];
    expect(getSnippets(wrapper)).toEqual(expectedSnippets);
  });

  it('selectAll', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets, selectAll } = React.useContext(SnippetsContext);
      return (
        <div>
          <div data-testid="snippets">{JSON.stringify(snippets)}</div>
          <Button dataTestId="selectAll" onClick={(): void => selectAll?.()} />
        </div>
      );
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar', yes: 'no' }}>
        <Component />
      </Provider>,
    );

    wrapper.find(ByDataTestId('selectAll')).simulate('click');

    expectedSnippets = [
      { prefix: 'foo', body: 'bar', selected: true },
      { prefix: 'yes', body: 'no', selected: true },
    ];
    expect(getSnippets(wrapper)).toEqual(expectedSnippets);
  });

  it('selectAll', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets, selectAll, deselectAll } = React.useContext(
        SnippetsContext,
      );
      return (
        <div>
          <div data-testid="snippets">{JSON.stringify(snippets)}</div>
          <Button dataTestId="selectAll" onClick={(): void => selectAll?.()} />
          <Button
            dataTestId="deselectAll"
            onClick={(): void => deselectAll?.()}
          />
        </div>
      );
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar', yes: 'no' }}>
        <Component />
      </Provider>,
    );

    wrapper.find(ByDataTestId('selectAll')).simulate('click');
    wrapper.find(ByDataTestId('deselectAll')).simulate('click');

    expectedSnippets = [
      { prefix: 'foo', body: 'bar', selected: false },
      { prefix: 'yes', body: 'no', selected: false },
    ];
    expect(getSnippets(wrapper)).toEqual(expectedSnippets);
  });

  it('updateSnippet', () => {
    const Component: React.FC<{}> = (): JSX.Element => {
      const { snippets, updateSnippet } = React.useContext(SnippetsContext);
      return (
        <div>
          <div data-testid="snippets">{JSON.stringify(snippets)}</div>
          <Button
            dataTestId="updateSnippet1"
            onClick={(): void => updateSnippet?.('prefix', 'yes', 0)}
          />
          <Button
            dataTestId="updateSnippet2"
            onClick={(): void => updateSnippet?.('body', 'no', 0)}
          />
        </div>
      );
    };

    wrapper = mount(
      <Provider storageItems={{ foo: 'bar' }}>
        <Component />
      </Provider>,
    );

    wrapper.find(ByDataTestId('updateSnippet1')).simulate('click');
    wrapper.find(ByDataTestId('updateSnippet2')).simulate('click');
    expectedSnippets = [{ prefix: 'yes', body: 'no', selected: false }];
    expect(getSnippets(wrapper)).toEqual(expectedSnippets);
  });
});
