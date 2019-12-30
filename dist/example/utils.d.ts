import { ReactElement } from 'react';
export declare function renderComponent(component: ReactElement): string;
export declare function renderComponentString(component: ReactElement): string;
export interface IToggle {
    active?: boolean;
    on?: any;
    off?: any;
    display?: any;
}
export declare function createToggles<T extends {
    [key: string]: IToggle;
}>(toggles: T, def?: any): {
    context: [T, import("react").Dispatch<import("react").SetStateAction<T>>];
    use: <K extends keyof T>(key: K) => any[];
};
