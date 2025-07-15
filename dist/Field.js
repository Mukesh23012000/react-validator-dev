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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState, useEffect } from 'react';
import { FieldContext } from './DevForm';
const Field = (_a) => {
    var { as = 'input', id = "", name = "", placeHolder = "", className = "", type = "", style = {}, change = "", input = "", click = "", focus = "", blur = "", error = "", errorClassName = "", errorStyle = { color: 'red' }, validate = false, children } = _a, props = __rest(_a, ["as", "id", "name", "placeHolder", "className", "type", "style", "change", "input", "click", "focus", "blur", "error", "errorClassName", "errorStyle", "validate", "children"]);
    const debounceDelay = 300;
    const [fieldType, setFieldType] = useState(as);
    const [value, setValue] = useState('');
    const { fields, updateFields } = useContext(FieldContext);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        const handler = setTimeout(() => {
            if (fields && name in fields && fields[name] !== value) {
                setValue(fields[name]);
            }
        }, debounceDelay);
        return () => {
            clearTimeout(handler);
        };
    }, [fields]);
    useEffect(() => {
        updateFields({ key: name, value });
    }, [value]);
    useEffect(() => {
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
            return (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({ id: id, name: name, placeholder: placeHolder, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, type: type, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props)), showError && _jsx("span", { className: errorClassName, style: errorStyle, children: error })] }));
        case 'textarea':
            return (_jsxs(_Fragment, { children: [_jsx("textarea", Object.assign({ id: id, name: name, placeholder: placeHolder, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props, { children: children })), showError && _jsx("span", { className: errorClassName, style: errorStyle, children: error })] }));
        case 'select':
            return (_jsxs(_Fragment, { children: [_jsx("select", Object.assign({ id: id, name: name, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props, { children: children })), showError && _jsx("span", { className: errorClassName, style: errorStyle, children: error })] }));
        default:
            return (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({ id: id, name: name, placeholder: placeHolder, value: value, onInput: (e) => handleInput, onChange: handleChange, style: style, className: className, type: type, onClick: (e) => handleClick, onFocus: handleFocus, onBlur: handleBlur }, props)), showError && _jsx("span", { className: errorClassName, style: errorStyle, children: error })] }));
    }
};
export default Field;
//# sourceMappingURL=Field.js.map