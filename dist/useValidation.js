"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const isRequiredCheck = (data, errorMessage) => !data ? errorMessage : '';
const maxLengthCheck = (data, max, errorMessage) => data.length > max ? errorMessage : '';
const minLengthCheck = (data, min, errorMessage) => data.length < min ? errorMessage : '';
const excludedCharactersCheck = (data, chars, errorMessage) => chars.some((char) => data.includes(char)) ? errorMessage : '';
const regexCheck = (data, regex, errorMessage) => new RegExp(regex).test(data) ? '' : errorMessage;
const alphaCheck = (data, errorMessage) => /^[A-Za-z]+$/.test(data) ? '' : errorMessage;
const emailCheck = (data, errorMessage) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data) ? '' : errorMessage;
};
const alphaWithDashCheck = (data, errorMessage) => {
    const regex = /^[A-Za-z]+(-[A-Za-z]+)*$/;
    return regex.test(data) ? '' : errorMessage;
};
const numericCheck = (data, errorMessage) => /^\d+$/.test(data) ? '' : errorMessage;
const isDateCheck = (data, errorMessage) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Example format YYYY-MM-DD
    const date = new Date(data);
    return regex.test(data) && !isNaN(date.getTime()) ? '' : errorMessage;
};
const alphaWithSpaceCheck = (data, errorMessage) => {
    const regex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    return regex.test(data) ? '' : errorMessage;
};
const sameAsFieldCheck = (data, errorMessage, fieldValue) => data === fieldValue ? '' : errorMessage;
const useValidation = (data, isMultiple = false, submit = true, debounceDelay = 300, validateAll = false) => {
    const [errors, setErrors] = (0, react_1.useState)({ errors: {}, status: true });
    const { fields, validation } = data;
    const [fieldsInitailStaus, setFieldsInitailStaus] = (0, react_1.useState)();
    const [submitted, setsubmitted] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        let status = Object.assign({}, fields);
        Object.keys(fields).forEach((field) => status[field] = false);
        setFieldsInitailStaus(status);
        setsubmitted(submit);
    }, []);
    const validateC = () => {
        const newErrors = {};
        const multipleMessages = [];
        Object.keys(fields).forEach((field) => {
            var _a;
            const value = fields[field];
            let error = '';
            const rules = validation.rules[field];
            const messages = (_a = validation === null || validation === void 0 ? void 0 : validation.messages) === null || _a === void 0 ? void 0 : _a[field];
            if (rules === null || rules === void 0 ? void 0 : rules.isRequired) {
                error = isRequiredCheck(value, (messages === null || messages === void 0 ? void 0 : messages.isRequired) || `Please enter the ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.maxLength) !== undefined) {
                error = maxLengthCheck(value, rules.maxLength, (messages === null || messages === void 0 ? void 0 : messages.maxLength) || `The ${field} length should be at most ${rules.maxLength}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.minLength) !== undefined) {
                error = minLengthCheck(value, rules.minLength, (messages === null || messages === void 0 ? void 0 : messages.minLength) || `The ${field} length should be at least ${rules.minLength}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.excludedCharacters)) {
                error = excludedCharactersCheck(value, rules.excludedCharacters, (messages === null || messages === void 0 ? void 0 : messages.excludedCharacters) || `Please enter valid ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.regex)) {
                error = regexCheck(value, rules.regex, (messages === null || messages === void 0 ? void 0 : messages.regex) || `The ${field} format is invalid`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.alpha)) {
                error = alphaCheck(value, (messages === null || messages === void 0 ? void 0 : messages.alpha) || `Please enter valid ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.email)) {
                error = emailCheck(value, (messages === null || messages === void 0 ? void 0 : messages.email) || `Please enter a valid ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.numeric)) {
                error = numericCheck(value, (messages === null || messages === void 0 ? void 0 : messages.numeric) || `Please enter a valid ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.date)) {
                error = isDateCheck(value, (messages === null || messages === void 0 ? void 0 : messages.date) || `Please enter a valid ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.alphaDash)) {
                error = alphaWithDashCheck(value, (messages === null || messages === void 0 ? void 0 : messages.alphaDash) || `Please enter valid ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.alphaSpace)) {
                error = alphaWithSpaceCheck(value, (messages === null || messages === void 0 ? void 0 : messages.alphaSpace) || `Please enter valid ${field}`);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error && (rules === null || rules === void 0 ? void 0 : rules.sameAsField)) {
                const otherFieldValue = fields[rules.sameAsField];
                error = sameAsFieldCheck(value, (messages === null || messages === void 0 ? void 0 : messages.sameAsField) || `Please ensure ${field} matches ${rules.sameAsField}`, otherFieldValue);
                (error === null || error === void 0 ? void 0 : error.length) && multipleMessages.push(error);
            }
            if (!error.length) {
                setFieldsInitailStaus(Object.assign(Object.assign({}, fieldsInitailStaus), { [field]: true }));
            }
            if (fieldsInitailStaus[field] == true || submitted == true) {
                newErrors[field] = !isMultiple ? error : multipleMessages;
            }
        });
        if (JSON.stringify(errors.errors) !== JSON.stringify(newErrors)) {
            const status = Object.values(newErrors).every((error) => !error);
            setErrors({ errors: newErrors, status });
        }
    };
    (0, react_1.useEffect)(() => {
        const handler = setTimeout(() => {
            validateC();
        }, debounceDelay);
        return () => {
            clearTimeout(handler);
        };
    }, [fields, validation, debounceDelay, submitted]);
    (0, react_1.useEffect)(() => {
        setsubmitted(true);
    }, [validateAll]);
    return [errors];
};
exports.default = useValidation;
