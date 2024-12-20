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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const DevForm_1 = require("./DevForm");
const Field = (_a) => {
    var { as = 'input', id = "", name = "", placeHolder = "", className = "", type = "", style = {}, change = "", input = "", click = "", focus = "", blur = "", error = "", errorClassName = "", errorStyle = { color: 'red' }, validate = false, children } = _a, props = __rest(_a, ["as", "id", "name", "placeHolder", "className", "type", "style", "change", "input", "click", "focus", "blur", "error", "errorClassName", "errorStyle", "validate", "children"]);
    const debounceDelay = 300;
    const [fieldType, setFieldType] = (0, react_1.useState)(as);
    const [value, setValue] = (0, react_1.useState)('');
    const { fields, updateFields } = (0, react_1.useContext)(DevForm_1.FieldContext);
    const [showError, setShowError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const handler = setTimeout(() => {
            if (fields && name in fields && fields[name] !== value) {
                setValue(fields[name]);
            }
        }, debounceDelay);
        return () => {
            clearTimeout(handler);
        };
    }, [fields]);
    (0, react_1.useEffect)(() => {
        updateFields({ key: name, value });
    }, [value]);
    (0, react_1.useEffect)(() => {
        setShowError(validate);
    }, [validate]);
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (typeof change === 'function') {
            change(newValue);
        }
    };
    const handleInput = (e) => {
        if (typeof input === 'function') {
            input(e.target.value);
        }
    };
    const handleClick = (e) => {
        if (typeof click === 'function') {
            click(e);
        }
    };
    const handleFocus = (e) => {
        if (typeof focus === 'function') {
            focus(e);
        }
    };
    const handleBlur = (e) => {
        setShowError(true);
        if (typeof blur === 'function') {
            blur(e);
        }
    };
    switch (fieldType) {
        case 'input':
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("input", Object.assign({ id: id, name: name, placeholder: placeHolder, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, type: type, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props)),
                showError && react_1.default.createElement("span", { className: errorClassName, style: errorStyle }, error)));
        case 'textarea':
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("textarea", Object.assign({ id: id, name: name, placeholder: placeHolder, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props), children),
                showError && react_1.default.createElement("span", { className: errorClassName, style: errorStyle }, error)));
        case 'select':
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("select", Object.assign({ id: id, name: name, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props), children),
                showError && react_1.default.createElement("span", { className: errorClassName, style: errorStyle }, error)));
        default:
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("input", Object.assign({ id: id, name: name, placeholder: placeHolder, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, type: type, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props)),
                showError && react_1.default.createElement("span", { className: errorClassName, style: errorStyle }, error)));
    }
};
exports.default = Field;
