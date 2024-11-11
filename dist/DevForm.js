"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldContext = void 0;
const react_1 = __importStar(require("react"));
exports.FieldContext = (0, react_1.createContext)(undefined);
const DevForm = ({ initialValues, children, changeField, submit }) => {
    const [fields, setFields] = (0, react_1.useState)(initialValues);
    const updateFields = (newValue) => {
        const { key, value } = newValue;
        setFields((prevFields) => (Object.assign(Object.assign({}, prevFields), { [key]: value })));
    };
    (0, react_1.useEffect)(() => {
        changeField(fields);
    }, [fields]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (submit) {
            submit(fields);
        }
    };
    return (react_1.default.createElement(exports.FieldContext.Provider, { value: { fields, updateFields } },
        react_1.default.createElement("form", { onSubmit: handleSubmit }, children)));
};
exports.default = DevForm;
