"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const server_1 = require("react-dom/server");
const pretty_format_1 = __importDefault(require("pretty-format"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const { ReactTestComponent } = pretty_format_1.default.plugins;
function renderComponent(component) {
    return pretty_format_1.default(react_test_renderer_1.default.create(component), {
        plugins: [ReactTestComponent],
        printFunctionName: true
    });
}
exports.renderComponent = renderComponent;
function renderComponentString(component) {
    return server_1.renderToStaticMarkup(component);
}
exports.renderComponentString = renderComponentString;
function createToggles(toggles, def = null) {
    for (const k in toggles) {
        if (!toggles.hasOwnProperty(k))
            continue;
        toggles[k].active = toggles[k].active || false;
        toggles[k].on = toggles[k].on || null;
        toggles[k].off = toggles[k].off || null;
        toggles[k].display = toggles[k].display || null;
    }
    const context = react_1.useState(toggles);
    const use = (key) => {
        const [state, setState] = context;
        let nextState = state;
        const setter = (active) => {
            // This happens when event is passed.
            if (typeof active === 'object')
                active = undefined;
            if (typeof active === 'undefined')
                active = state[key].active ? false : true;
            state[key] = { ...state[key], active };
            nextState = { ...state };
            setState(nextState);
        };
        const isActive = nextState[key].active;
        const value = isActive ? nextState[key].on : nextState[key].off;
        const display = isActive ? nextState[key].display : def;
        return [value, setter, display, isActive];
    };
    return {
        context,
        use
    };
}
exports.createToggles = createToggles;
//# sourceMappingURL=utils.js.map