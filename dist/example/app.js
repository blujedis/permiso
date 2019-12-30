"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const wouter_1 = require("wouter");
const home_1 = __importDefault(require("./home"));
const menu_1 = __importDefault(require("./menu"));
const route_1 = __importDefault(require("./route"));
const NotFound = (props) => {
    return (react_1.default.createElement("div", null, "404 - Not Found"));
};
const App = () => {
    return (react_1.default.createElement(wouter_1.Router, null,
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", null,
                react_1.default.createElement(menu_1.default, { name: "Library Name" })),
            react_1.default.createElement(wouter_1.Switch, null,
                react_1.default.createElement(route_1.default, { path: "/", component: home_1.default }),
                react_1.default.createElement(route_1.default, { path: "/:404*", component: NotFound })))));
};
exports.default = App;
//# sourceMappingURL=app.js.map