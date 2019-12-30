"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const store_1 = require("./store");
const Route = (props) => {
    const [state, setState] = store_1.useStore();
    const { path, component: Component, ...clone } = props;
    const key = path.replace(/^\//, '') || 'home';
    react_1.useEffect(() => {
        setState({ ...state, ...{ active: state[key] } });
    }, [path]);
    return (react_1.default.createElement(Component, Object.assign({}, clone)));
};
exports.default = Route;
//# sourceMappingURL=route.js.map