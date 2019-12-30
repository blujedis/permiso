/**
 * Setter helper type to set namespace.
 */
export type Setter<T = any> = <K extends keyof T>(key: K) => void;

/**
 * The compiler function that returns the compiled namespace.
 */
export type Compiler = () => string;

export interface INext<T, E> {
  (): Next<T, E> & E;
  <K extends keyof T>(...children: K[]): { toString: () => string, toArray: () => string[] };
}

/**
 *  Type that returns each instance of permissions in stack.
 */
export type Next<T, E> = { [P in keyof T]: T[P] extends string ? () => E : INext<T[P], E> };
