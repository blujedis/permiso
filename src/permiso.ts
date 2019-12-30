import { get, has as hasProp } from 'dot-prop';
import { Next } from './types';

/**
 * Checks if namespace has deny token.
 * 
 * @param namespace the namespace to inspect.
 */
function hasNot(namespace: string) {
  return !!~namespace.indexOf('!');
}

/**
 * Checks if has "any" token.
 * 
 * @param namespace the namespace to inspect.
 */
function hasAny(namespace: string) {
  return !!~namespace.indexOf('*');
}

/**
 * Creates namspace permissions helper.
 * 
 * @param perms the permissions object used to generate namespaces.
 * @param domain the domain to create the namspace helper for.
 * @param obfuscator: function used to create obfuscation map for namespaces.
 */
export function permiso<P extends object>(perms: P, domain?: string, obfuscator?: (value: any) => any) {

  const reverseMap: any = {};
  perms = { ...perms };

  obfuscator = obfuscator || ((v) => v);

  /**
   * Parses a namespace returning clean namespace with isAny and isNot flags.
   * 
   * @param namespace the namespace to be parsed.
   */
  function parse(namespace: string) {

    const isNot = hasNot(namespace);
    const isAny = hasAny(namespace);

    const clean = namespace.replace(/(\!|(\.)?\*)/g, '');
    const segments = clean.split('.');
    const isDom = typeof domain !== 'undefined' ? segments[0] === domain : false;
    const dom = isDom ? domain : undefined;

    return {
      domain: dom,
      namespace,
      clean,
      hasAny: isAny,
      hasNot: isNot
    };

  }

  /**
   * Expands children to array by iterating object by namespace.
   * 
   * @param prefix the prefix namespace path.
   * @param obj the object to iterate.
   * @param children the array of children to return.
   */
  function expandChildren(prefix: string, obj: object, children = []) {

    for (const k in obj) {

      if (!obj.hasOwnProperty(k) || k === '__KEY__') continue;

      const ns = prefix + '.' + k;

      if (typeof obj[k] === 'object')
        expandChildren(ns, obj[k], children);

      else
        children.push(ns);

    }

    return children;

  }

  /**
   * Expand namespaces at key. By default paths prefixed with "!" will be excluded.
   * To include set "withDenied" to true.
   * 
   * @param ns the prefix namespace.
   * @param withDenied when true include denied paths.
   */
  function expandNamespace(ns: string, withDenied: boolean = false) {

    const obj = domain ? { [domain]: perms } : perms;

    const parsed = parse(ns);
    const clean = parsed.clean;

    if ((hasNot(ns) && !withDenied))
      return [];

    if (!hasAny(ns) || (!hasAny(ns) && hasNot(ns) && withDenied))
      return [clean];

    // If we get here check children.
    const child = get(obj, clean) as object;

    // No children just return namespace.
    if (!child)
      return [clean];

    const children = expandChildren(clean, child).sort();

    return children;

  }

  /**
   * Creates a new context for iterating namespaces.
   */
  function createContext<T>(obj: T) {

    if (domain && domain.length)
      obj = { [domain]: obj } as any;

    type Configuration = typeof confBase;

    const confBase = {

      ns: (domain && domain.length ? [domain] : []) as string[],
      children: [] as string[],
      isAny: false,
      isNot: false,

      compile: (asString: boolean = false) => {

        let _ns = conf.ns.join('.');

        // If full namespace ends at an object it must
        // but set as any.
        if (typeof get(obj, _ns) === 'object')
          conf.isAny = true;

        if (conf.isAny)
          _ns += '.*';

        if (conf.isNot)
          _ns = '!' + _ns;

        // Only return primary value.
        if (asString)
          return _ns;

        let children = conf.children;

        if (children && children.length) {
          children = children.map(c => {
            if (conf.isNot)
              c = '!' + c;
            if (conf.isAny)
              c += '.*';
            return c;
          });
        }

        return [
          _ns,
          ...children
        ];

      },

      setter: (val) => {
        if (typeof val === undefined && typeof val === null)
          return;
        if (typeof val === 'string')
          conf.ns.push(val);
        else
          conf.children = [...conf.children, ...val];
      }

    };

    const conf = {
      configurations: [] as Configuration[],
      ...confBase
    };

    const extend = {

      any: () => {
        conf.isAny = true;
        return {
          not: extend.not,
          toString: extend.toString,
          toArray: extend.toArray
        };
      },

      not: () => {
        conf.isNot = true;
        return {
          any: extend.any,
          toString: extend.toString,
          toArray: extend.toArray
        };
      },

      next: () => {
        conf.configurations.push(conf);
        return chain(perms, { conf, extend });
      },

      toString: () => {
        return conf.compile(true) as string;
      },

      toArray: () => {
        return conf.compile() as string[];
      }

    };

    return {
      conf,
      extend
    };

  }

  /**
   * Validates the specified namespaces.
   * 
   * @param ns the namespaces to validate.
   */
  function validate(namespaces: string[]): boolean;

  /**
   * Validates the specified namespace.
   * 
   * @param namespace the namespace to validate.
   */
  function validate(namespace: string): boolean;
  function validate(namespace: string | string[]) {

    if (typeof namespace !== 'string' && !Array.isArray(namespace) ||
      (!Array.isArray(namespace) && typeof namespace[0] !== 'string'))
      return false;

    if (!Array.isArray(namespace))
      namespace = [namespace];

    namespace = [...namespace];

    const obj = domain && domain.length ? { [domain]: perms } : perms;

    let isValid = true;

    while (isValid && namespace.length) {
      const ns = parse(namespace.shift()).clean;
      isValid = hasProp(obj, ns);
    }

    return isValid;

  }

  /**
   * Compares to arrays to see if namepaces exist in compare.
   * 
   * @param namespaces the namespaces to compare against.
   * @param compare the array to be compared.
   */
  function has(namespaces: string[], compare: string[]): boolean;

  /**
   * Checks if namespace is in compare array.
   * 
   * @param namespace the namespace to check if exists in compare.  
   * @param compare an array to compare if contains namespace.
   */
  function has(namespace: string, compare: string[]): boolean;

  /**
   * Checks if namespace and compare are equal.
   * 
   * @param namespace the namespace to compare.
   * @param compare the compare namespace.
   */
  function has(namespaces: string, compare: string): boolean;
  function has(namespaces: string | string[], compare: string | string[]) {

    if (typeof namespaces === 'string' && typeof compare === 'string')
      return namespaces === compare;

    if (!Array.isArray(compare))
      compare = [compare];

    if (!Array.isArray(namespaces))
      namespaces = [namespaces as string];

    return compare.some((v => {
      return !!~namespaces.indexOf(v);
    }));

  }

  /**
   * Checks if a namespace contains a domain.
   * 
   * @param namespace the namespace to inspect.
   */
  function hasDomain(namespace: string) {
    return !!parse(namespace).domain;
  }

  /**
   * Expands array of namespaces.
   * 
   * @param withDenied when true includes denied namespaces.
   * @param namespaces array of namespaces to expand.
   */
  function expand(withDenied: boolean, ...namespaces: string[]): string[];

  /**
   * Expands array of namespaces.
   * 
   * @param namespaces array of namespaces to expand.
   */
  function expand(...namespaces: string[]): string[];
  function expand(withDenied: string | boolean, ...namespaces: string[]) {

    if (typeof withDenied === 'string') {
      namespaces.unshift(withDenied);
      withDenied = undefined;
    }

    const expanded = namespaces.reduce((a, c) => {
      return [...a, ...expandNamespace(c, withDenied as boolean)];
    }, []);

    return expanded;

  }

  /**
   * Converts namespaces to obfuscated or defined values..
   * 
   * @param namespaces the namespaces to be mapped to values.
   */
  function obfuscate(...namespaces: string[]) {

    const map = perms;

    return expand(...namespaces).map(n => {

      const parsed = parse(n);
      const segments = parsed.domain ? parsed.clean.split('.').slice(1) : parsed.clean.split('.');
      const current = [];

      const mapped = segments.reduce((a, v, i) => {
        current.push(v);
        const val = get(map, current.join('.'));
        if (typeof val === 'object')
          return [...a, (val as any).__KEY__];
        return [...a, val];
      }, []).join('.');

      if (parsed.domain)
        return parsed.domain + '.' + mapped;

      return mapped;

    });

  }

  /**
   * Converts namespaces to obfuscated or defined values..
   * 
   * @param namespaces the namespaces to be mapped to values.
   */
  function unobfuscate(...namespaces: string[]) {

    const map = reverseMap;

    return expand(...namespaces).map(n => {

      const parsed = parse(n);
      const segments = parsed.domain ? parsed.clean.split('.').slice(1) : parsed.clean.split('.');
      const current = [];

      const mapped = segments.reduce((a, v, i) => {
        current.push(v);
        const val = get(map, current.join('.'));
        if (typeof val === 'object')
          return [...a, (val as any).__KEY__];
        return [...a, val];
      }, []).join('.');

      if (parsed.domain)
        return parsed.domain + '.' + mapped;

      return mapped;

    });

  }

  /**
   * Chain's object for permissions namespacing.
   * 
   * @param obj the object to inspect and chain for permissions.
   */
  function chain<T>(obj: T, context?: ReturnType<typeof createContext>) {

    context = context || createContext(obj);
    const { conf, extend } = context;
    const { setter } = conf;

    type Extend = typeof extend;

    function createNext<M, K extends keyof M>(map: M, key: K) {

      if (typeof map[key] === 'string') {
        return () => {
          setter(key);
          return extend;
        };
      }

      return (...children: Array<keyof M[K]>) => {
        setter(key);
        if (children && children.length)
          setter(children.map(c => {
            return conf.ns.join('.') + '.' + c;
          }));
        return chain(map[key], context);
      };

    }

    const nextObj = {} as any;

    for (const k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      nextObj[k] = createNext(obj, k);
    }

    return { ...nextObj, ...extend } as Next<T, Extend> & Extend;

  }

  /**
   * Randomizes values for keys.
   * 
   * @param obj the object to randomize.
   */
  function randomizePerms(obj, reverse) {

    for (const k in obj) {

      if (!obj.hasOwnProperty(k)) continue;

      if (typeof obj[k] === 'object') {
        const val = obfuscator(k);
        obj[k].__KEY__ = val;
        reverse[val] = {
          __KEY__: k
        };
        randomizePerms(obj[k], reverse[val]);
      }
      else if (k !== '__KEY__') {
        obj[k] = obfuscator(obj[k]);
        reverse[obj[k]] = k;
      }

    }

    return obj;

  }

  randomizePerms(perms, reverseMap);

  const methods = {
    create: () => chain(perms),
    validate,
    expand,
    has,
    hasDomain,
    parse,
    obfuscate,
    unobfuscate
  };

  return methods;

}
