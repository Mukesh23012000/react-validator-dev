import { useState, useEffect } from "react";
import { mandatoryProps, optionalProps } from "./exceptionHandler";
import { validators } from "./validators";
const useValidation = (props) => {
    //Exception handling for props
    const { fields, validation } = mandatoryProps(props);
    const { isMultiple, debounceDelay, customValidators } = optionalProps(props);
    const [returnAPIs, setReturnAPIs] = useState({
        errors: {},
        isValid: false,
        touchedFields: {},
    });
    const markTouched = (field) => {
        setReturnAPIs((prev) => (Object.assign(Object.assign({}, prev), { touchedFields: Object.assign(Object.assign({}, prev.touchedFields), { [field]: true }) })));
    };
    const validate = () => {
        const newErrors = {};
        Object.keys(fields).forEach((field) => {
            var _a;
            const value = fields[field];
            const rules = validation.rules[field];
            if (!rules)
                return;
            const messages = ((_a = validation.messages) === null || _a === void 0 ? void 0 : _a[field]) || {};
            const multipleMessages = [];
            let hasError = false;
            // isRequired check
            if (rules.isRequired) {
                const error = validators.isRequired(value, messages.isRequired || `Please enter the ${field}`);
                if (error) {
                    multipleMessages.push(error);
                    hasError = true;
                    if (!isMultiple) {
                        newErrors[field] = error;
                        return;
                    }
                }
            }
            // Custom validator check 
            if (rules.custom && (customValidators === null || customValidators === void 0 ? void 0 : customValidators[field])) {
                const error = customValidators[field](value, fields);
                if (error) {
                    if (!isMultiple) {
                        newErrors[field] = error;
                        return;
                    }
                    else {
                        multipleMessages.push(error);
                    }
                }
            }
            // Additional checks if not failed by isRequired
            if (!hasError || isMultiple) {
                const checks = Object.entries(rules).filter(([key]) => key !== "isRequired");
                for (const [rule, ruleValue] of checks) {
                    let error = "";
                    switch (rule) {
                        case "maxLength":
                            error = validators.maxLength(value, ruleValue, messages.maxLength || `The ${field} length should be at most ${ruleValue}`);
                            break;
                        case "minLength":
                            error = validators.minLength(value, ruleValue, messages.minLength || `The ${field} length should be at least ${ruleValue}`);
                            break;
                        case "excludedCharacters":
                            error = validators.excludedCharacters(value, ruleValue, messages.excludedCharacters || `Please enter valid ${field}`);
                            break;
                        case "regex":
                            error = validators.regex(value, ruleValue, messages.regex || `The ${field} format is invalid`);
                            break;
                        case "alpha":
                            error = validators.alpha(value, messages.alpha || `Please enter valid ${field}`);
                            break;
                        case "alphaDash":
                            error = validators.alphaDash(value, messages.alphaDash || `Please enter valid ${field}`);
                            break;
                        case "alphaSpace":
                            error = validators.alphaSpace(value, messages.alphaSpace || `Please enter valid ${field}`);
                            break;
                        case "numeric":
                            error = validators.numeric(value, messages.numeric || `Please enter valid ${field}`);
                            break;
                        case "email":
                            error = validators.email(value, messages.email || `Please enter a valid ${field}`);
                            break;
                        case "date":
                            error = validators.date(value, messages.date || `Please enter a valid ${field}`);
                            break;
                        case "sameAsField":
                            const otherFieldValue = fields[ruleValue];
                            error = validators.sameAsField(value, otherFieldValue, messages.sameAsField || `Please ensure ${field} matches ${ruleValue}`);
                            break;
                    }
                    if (error) {
                        if (!isMultiple) {
                            newErrors[field] = error;
                            return;
                        }
                        else {
                            multipleMessages.push(error);
                        }
                    }
                }
            }
            newErrors[field] = isMultiple ? multipleMessages : "";
        });
        if (JSON.stringify(returnAPIs.errors) !== JSON.stringify(newErrors)) {
            const hasErrors = Object.values(newErrors).some((e) => Array.isArray(e) ? e.length > 0 : !!e);
            setReturnAPIs((prev) => (Object.assign(Object.assign({}, prev), { errors: newErrors, isValid: !hasErrors })));
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => validate(), debounceDelay);
        return () => clearTimeout(handler);
    }, [fields, validation, debounceDelay]);
    return Object.assign(Object.assign({}, returnAPIs), { markTouched });
};
export default useValidation;
//# sourceMappingURL=useValidation.js.map