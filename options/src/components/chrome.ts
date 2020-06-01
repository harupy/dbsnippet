import * as React from 'react';

import { ObjStr } from '../types';

interface fromObj<T> {
  (obj: ObjStr): T;
}

interface toObj<T> {
  (t: T): ObjStr;
}

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export const useChromeStorageSyncGet = <T>(
  setter: Setter<T>,
  f: fromObj<T>,
): { (): void } => (): void => {
  chrome.storage.sync.get(items => setter(f(items)));
};

export const useChromeStorageSyncSet = <T>(f: toObj<T>): { (t: T): void } => (
  t: T,
): void => {
  chrome.storage.sync.clear();
  chrome.storage.sync.set(f(t));
};
