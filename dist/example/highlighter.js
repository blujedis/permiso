"use strict";
/**
 * @see https://www.npmjs.com/package/react-syntax-highlighter
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_syntax_highlighter_1 = require("react-syntax-highlighter");
const prism_1 = require("react-syntax-highlighter/dist/esm/styles/prism");
const Highlighter = ({ language, content, visible }) => {
    content = content || '';
    language = language || 'typescript';
    return (!visible ? null :
        react_1.default.createElement("div", { style: { marginTop: '18px' } },
            react_1.default.createElement(react_syntax_highlighter_1.Prism, { language: language, style: prism_1.okaidia }, content)));
};
exports.default = Highlighter;
//# sourceMappingURL=highlighter.js.map