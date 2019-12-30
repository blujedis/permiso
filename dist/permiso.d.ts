import { Next } from './types';
/**
 * Creates namspace permissions helper.
 *
 * @param perms the permissions object used to generate namespaces.
 * @param domain the domain to create the namspace helper for.
 * @param randomize: when true values are randomized using simple hash.
 */
export declare function permiso<P extends object>(perms: P, domain?: string, randomize?: boolean): {
    create: () => Next<P, {
        any: () => {
            not: () => {
                any: any;
                toString: () => string;
                toArray: () => string[];
            };
            toString: () => string;
            toArray: () => string[];
        };
        not: () => {
            any: () => {
                not: any;
                toString: () => string;
                toArray: () => string[];
            };
            toString: () => string;
            toArray: () => string[];
        };
        toString: () => string;
        toArray: () => string[];
    }> & {
        any: () => {
            not: () => {
                any: any;
                toString: () => string;
                toArray: () => string[];
            };
            toString: () => string;
            toArray: () => string[];
        };
        not: () => {
            any: () => {
                not: any;
                toString: () => string;
                toArray: () => string[];
            };
            toString: () => string;
            toArray: () => string[];
        };
        toString: () => string;
        toArray: () => string[];
    };
    validate: {
        (namespaces: string[]): boolean;
        (namespace: string): boolean;
    };
    expand: {
        (withDenied: boolean, ...namespaces: string[]): string[];
        (...namespaces: string[]): string[];
    };
    has: {
        (namespaces: string[], compare: string[]): boolean;
        (namespace: string, compare: string[]): boolean;
        (namespaces: string, compare: string): boolean;
    };
    hasDomain: (namespace: string) => boolean;
    parse: (namespace: string) => {
        domain: string;
        namespace: string;
        clean: string;
        hasAny: boolean;
        hasNot: boolean;
    };
    obfuscate: (...namespaces: string[]) => string[];
    unobfuscate: (...namespaces: string[]) => string[];
};
