import {OneOrMany, Params} from './types';

export function findKey<K extends string, V>(obj: Params<K, OneOrMany<V>>, key: string): OneOrMany<V> | undefined {
  key = key.toLowerCase();

  for (const [k, v] of Object.entries(obj)) {
    if (k.toLowerCase() === key) {
      return v as OneOrMany<V>;
    }
  }
}
