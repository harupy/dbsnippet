import { ObjStr, SetState } from '../types';

export interface FromObj<T> {
  (obj: ObjStr): T;
}

export interface ToObj<T> {
  (t: T): ObjStr;
}

export const useChromeStorageSyncGet = <T>(
  setter: SetState<T>,
  f: FromObj<T>,
): { (): void } => (): void => {
  chrome.storage.sync.get(items => setter(f(items)));
};

export const useChromeStorageSyncSet = <T>(f: ToObj<T>): { (t: T): void } => (
  t: T,
): void => {
  chrome.storage.sync.clear();
  chrome.storage.sync.set(f(t));
};
