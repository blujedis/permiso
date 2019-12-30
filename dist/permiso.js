"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dot_prop_1 = require("dot-prop");
/**
 * Checks if namespace has deny token.
 *
 * @param namespace the namespace to inspect.
 */
function hasNot(namespace) {
    return !!~namespace.indexOf('!');
}
/**
 * Checks if has "any" token.
 *
 * @param namespace the namespace to inspect.
 */
function hasAny(namespace) {
    return !!~namespace.indexOf('*');
}
/**
 * Simple helper to hash a string value
 *
 * @param val the value to be hashed.
 */
function hashValue(val) {
    let hash = 0;
    val += '';
    const strlen = val.length;
    let charAt;
    if (strlen === 0)
        return hash;
    for (let i = 0; i < strlen; i++) {
        charAt = val.charCodeAt(i);
        hash = ((hash << 3) - hash) + charAt;
        hash = hash & hash;
    }
    return hash;
}
/**
 * Creates namspace permissions helper.
 *
 * @param perms the permissions object used to generate namespaces.
 * @param domain the domain to create the namspace helper for.
 * @param randomize: when true values are randomized using simple hash.
 */
function permiso(perms, domain, randomize = true) {
    const reverseMap = {};
    perms = { ...perms };
    /**
     * Parses a namespace returning clean namespace with isAny and isNot flags.
     *
     * @param namespace the namespace to be parsed.
     */
    function parse(namespace) {
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
    function expandChildren(prefix, obj, children = []) {
        for (const k in obj) {
            if (!obj.hasOwnProperty(k) || k === '__KEY__')
                continue;
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
    function expandNamespace(ns, withDenied = false) {
        const obj = domain ? { [domain]: perms } : perms;
        const parsed = parse(ns);
        const clean = parsed.clean;
        if ((hasNot(ns) && !withDenied))
            return [];
        if (!hasAny(ns) || (!hasAny(ns) && hasNot(ns) && withDenied))
            return [clean];
        // If we get here check children.
        const child = dot_prop_1.get(obj, clean);
        // No children just return namespace.
        if (!child)
            return [clean];
        const children = expandChildren(clean, child).sort();
        return children;
    }
    /**
     * Creates a new context for iterating namespaces.
     */
    function createContext(obj) {
        if (domain && domain.length)
            obj = { [domain]: obj };
        const conf = {
            ns: (domain && domain.length ? [domain] : []),
            children: [],
            isAny: false,
            isNot: false,
            compile: (asString = false) => {
                let _ns = conf.ns.join('.');
                // If full namespace ends at an object it must
                // but set as any.
                if (typeof dot_prop_1.get(obj, _ns) === 'object')
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
            toString: () => {
                return conf.compile(true);
            },
            toArray: () => {
                return conf.compile();
            }
        };
        return {
            conf,
            extend
        };
    }
    function validate(namespace) {
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
            isValid = dot_prop_1.has(obj, ns);
        }
        return isValid;
    }
    function has(namespaces, compare) {
        if (typeof namespaces === 'string' && typeof compare === 'string')
            return namespaces === compare;
        if (!Array.isArray(compare))
            compare = [compare];
        if (!Array.isArray(namespaces))
            namespaces = [namespaces];
        return compare.some((v => {
            return !!~namespaces.indexOf(v);
        }));
    }
    /**
     * Checks if a namespace contains a domain.
     *
     * @param namespace the namespace to inspect.
     */
    function hasDomain(namespace) {
        return !!parse(namespace).domain;
    }
    function expand(withDenied, ...namespaces) {
        if (typeof withDenied === 'string') {
            namespaces.unshift(withDenied);
            withDenied = undefined;
        }
        const expanded = namespaces.reduce((a, c) => {
            return [...a, ...expandNamespace(c, withDenied)];
        }, []);
        return expanded;
    }
    /**
     * Converts namespaces to obfuscated or defined values..
     *
     * @param namespaces the namespaces to be mapped to values.
     */
    function obfuscate(...namespaces) {
        const map = perms;
        return expand(...namespaces).map(n => {
            const parsed = parse(n);
            const segments = parsed.domain ? parsed.clean.split('.').slice(1) : parsed.clean.split('.');
            const current = [];
            const mapped = segments.reduce((a, v, i) => {
                current.push(v);
                const val = dot_prop_1.get(map, current.join('.'));
                if (typeof val === 'object')
                    return [...a, val.__KEY__];
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
    function unobfuscate(...namespaces) {
        const map = reverseMap;
        return expand(...namespaces).map(n => {
            const parsed = parse(n);
            const segments = parsed.domain ? parsed.clean.split('.').slice(1) : parsed.clean.split('.');
            const current = [];
            const mapped = segments.reduce((a, v, i) => {
                current.push(v);
                const val = dot_prop_1.get(map, current.join('.'));
                if (typeof val === 'object')
                    return [...a, val.__KEY__];
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
    function chain(obj, context) {
        context = context || createContext(obj);
        const { conf, extend } = context;
        const { setter } = conf;
        function createNext(map, key) {
            if (typeof map[key] === 'string') {
                return () => {
                    setter(key);
                    return extend;
                };
            }
            return (...children) => {
                setter(key);
                if (children && children.length)
                    setter(children.map(c => {
                        return conf.ns.join('.') + '.' + c;
                    }));
                return chain(map[key], context);
            };
        }
        const nextObj = {};
        for (const k in obj) {
            if (!obj.hasOwnProperty(k))
                continue;
            nextObj[k] = createNext(obj, k);
        }
        return { ...nextObj, ...extend };
    }
    /**
     * Randomizes values for keys.
     *
     * @param obj the object to randomize.
     */
    function randomizePerms(obj, reverse) {
        for (const k in obj) {
            if (!obj.hasOwnProperty(k))
                continue;
            if (typeof obj[k] === 'object') {
                const val = hashValue(k);
                if (randomize)
                    obj[k].__KEY__ = val;
                reverse[val] = {
                    __KEY__: k
                };
                randomizePerms(obj[k], reverse[val]);
            }
            else {
                if (k !== '__KEY__') {
                    if (randomize)
                        obj[k] = hashValue(obj[k]);
                    reverse[obj[k]] = k;
                }
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
exports.permiso = permiso;
//# sourceMappingURL=permiso.js.map