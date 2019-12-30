/// <reference types="react" />
declare const Provider: ({ reducer, initialState, children }: import("restash").IProvider<import("restash").IRestashState<{
    data: any;
    active: {
        menu: string;
        title: string;
        description: string;
        box: string;
    };
    home: {
        menu: string;
        title: string;
        description: string;
        box: string;
    };
}, "start" | "progress" | "error" | "complete" | "init" | "mounted">, import("restash").IRestashAction<"data", any>>) => JSX.Element, useStore: {
    <K extends "data" | "home" | "active">(key: K): [{
        data: any;
        active: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
        home: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
    }[K], import("restash").DispatchAt<{
        data: any;
        active: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
        home: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
    }, "start" | "progress" | "error" | "complete", K>];
    (): [{
        data: any;
        active: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
        home: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
    }, import("restash").Dispatch<{
        data: any;
        active: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
        home: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
    }, "start" | "progress" | "error" | "complete">, import("restash").IRestash<{
        data: any;
        active: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
        home: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
    }, "start" | "progress" | "error" | "complete", import("restash").Dispatch<{
        data: any;
        active: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
        home: {
            menu: string;
            title: string;
            description: string;
            box: string;
        };
    }, "start" | "progress" | "error" | "complete">>];
};
export { Provider, useStore };
