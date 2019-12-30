"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restash_1 = require("restash");
const { Provider, useStore } = restash_1.createRestash({
    initialState: {
        data: null,
        active: {
            menu: 'Initialize',
            title: 'Octopoda Init',
            description: 'Shows how to initialize Octo.',
            box: 'box has-text-white has-background-link is-size-5'
        },
        home: {
            menu: 'Initialize',
            title: 'Octopoda Init',
            description: 'Initializing an Octo store instance.',
            box: 'box has-text-white has-background-link is-size-5'
        }
    }
});
exports.Provider = Provider;
exports.useStore = useStore;
//# sourceMappingURL=store.js.map