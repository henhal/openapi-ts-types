import {findKey} from 'src/utils';

export type OneOrMany<T> = T | Array<T>;

export type Params<K extends string = string, V = OneOrMany<string | number | boolean | undefined>> = Record<K, V>;

export namespace Params {
  export function getValue<K extends string, V>(obj: Params<K, OneOrMany<V>>, key: string): V | undefined {
    const v = findKey(obj, key);

    return Array.isArray(v) ? v[0] : v;
  }

  export function getValues<K extends string, V>(obj: Params<K, OneOrMany<V>>, key: string): V[] | undefined {
    const v = findKey(obj, key);

    return Array.isArray(v) ? v : v != null ? [v] : undefined;
  }
}

export type StringParams = Params<string, OneOrMany<string>>;

/**
 * A typed request
 * @template Body Type of request body
 * @template PathParams Type of request path parameters
 * @template Query Type of request query
 * @template Headers Type of request headers
 *
 * @property method HTTP method
 * @property path Path
 * @property params Path params
 * @property headers Headers
 * @property body Body content parsed from JSON
 * @property query Query string or parsed query object
 *
 */
export interface Request<Body = unknown,
    PathParams extends Params = Params,
    Query extends Params = Params,
    Headers extends Params = Params,
    Cookies extends Params = Params> {
  method: string;
  path: string;
  params: PathParams;
  query: Query;
  headers: Headers;
  cookies: Cookies;
  body: Body;
}

/**
 * Response - this is an output parameter for a handler function to fill in
 * @template Body Type of response body
 * @template Headers Type of response headers
 *
 * @property statusCode HTTP status code
 * @property body Body content which will be sent as JSON
 * @property headers Headers
 */
export interface Response<Body = unknown, Headers extends Params = Params> {
  statusCode?: number;
  headers: Partial<Headers>;
  body?: Body;
}
