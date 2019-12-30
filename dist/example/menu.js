"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const wouter_1 = require("wouter");
const store_1 = require("./store");
// @ts-ignore
const devVars = typeof window ? __DEV_VARS__ : {};
const Menu = ({ name }) => {
    const [store] = store_1.useStore();
    let ver = (devVars.version || '');
    ver = ver.length ? '(' + ver + ')' : '';
    const docs = devVars.docs || '/';
    const active = store.active;
    return (react_1.default.createElement("div", { style: { marginTop: '24px' } },
        react_1.default.createElement("div", { className: "level" },
            react_1.default.createElement("div", { className: "level-item level-left" },
                react_1.default.createElement("h1", { className: "title is-1", style: { marginBottom: '8px' } },
                    devVars.title || 'Library Name',
                    react_1.default.createElement("span", { className: "subtitle is-5 has-text-grey-lighter" },
                        " ",
                        ver))),
            react_1.default.createElement("div", { className: "level-item level-right" },
                react_1.default.createElement("h3", { className: "title is-3 has-text-grey-light" },
                    active.title || 'asdf',
                    " ",
                    react_1.default.createElement("a", { style: { paddingLeft: '24px' }, href: devVars.repo, target: "_blank" },
                        react_1.default.createElement("img", { src: "/github.png", width: "30", style: { position: 'relative', opacity: 0.5, paddingTop: '3px' } }))))),
        react_1.default.createElement("nav", { className: "navbar", role: "navigation", "aria-label": "main navigation" },
            react_1.default.createElement("div", { className: "navbar-brand" }),
            react_1.default.createElement("div", { id: "navbarBasicExample", className: "navbar-menu" },
                react_1.default.createElement("div", { className: "navbar-start" },
                    react_1.default.createElement(wouter_1.Link, { href: "/" },
                        react_1.default.createElement("a", { className: "navbar-item" }, store.home.menu)),
                    react_1.default.createElement(wouter_1.Link, { href: "/hook" }),
                    react_1.default.createElement("a", { className: "navbar-item", href: docs, target: "_blank" }, "Docs"))))));
};
exports.default = Menu;
//# sourceMappingURL=menu.js.map