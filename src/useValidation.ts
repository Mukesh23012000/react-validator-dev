import { useState, useEffect } from "react";

interface ValidationRule {
    isRequired?: boolean;
    maxLength?: number;
    minLength?: number;
    excludedCharacters?: string[];
    regex?: string;
    alpha?: boolean;
    email?: boolean;
    numeric?: boolean;
    date?: boolean; 
    alphaDash?: boolean;
    alphaSpace?: boolean;
    sameAsField?: string;
}

interface ErrorMessage {
    isRequired?: string;
    maxLength?: string;
    minLength?: string;
    excludedCharacters?: string;
    regex?: string;
    alpha?: string;
    email?: string;
    numeric?: string;
    date?: string; 
    alphaDash?: string;
    alphaSpace?: string;
    sameAsField?: string;
}

interface Validation {
    rules: { [key: string]: ValidationRule };
    messages?: { [key: string]: ErrorMessage };
}

interface ValidationErrors {
    errors: Record<string, string>;
    status: boolean;
}

const isRequiredCheck = (data: any, errorMessage: string) => 
    !data ? errorMessage : '';

const maxLengthCheck = (data: any, max: number, errorMessage: string) => 
    data.length > max ? errorMessage : '';

const minLengthCheck = (data: any, min: number, errorMessage: string) => 
    data.length < min ? errorMessage : '';

const excludedCharactersCheck = (data: any, chars: string[], errorMessage: string) => 
    chars.some((char) => data.includes(char)) ? errorMessage : '';

const regexCheck = (data: any, regex: string, errorMessage: string) => 
    new RegExp(regex).test(data) ? '' : errorMessage;

const alphaCheck = (data: any, errorMessage: string) => /^[A-Za-z]+$/.test(data) ? '' : errorMessage;

const emailCheck = (data: string, errorMessage: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data) ? '' : errorMessage;
};

const alphaWithDashCheck = (data: string, errorMessage: string) => {
    const regex = /^[A-Za-z]+(-[A-Za-z]+)*$/;
    return regex.test(data) ? '' : errorMessage;
};

const numericCheck = (data: string, errorMessage: string) => /^\d+$/.test(data) ? '' : errorMessage;

const isDateCheck = (data: string, errorMessage: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Example format YYYY-MM-DD
    const date = new Date(data);
    return regex.test(data) && !isNaN(date.getTime()) ? '' : errorMessage;
};

const alphaWithSpaceCheck = (data: string, errorMessage: string) => {
    const regex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    return regex.test(data) ? '' : errorMessage;
};

const sameAsFieldCheck = (data: string, errorMessage: string, fieldValue: string) => 
    data === fieldValue ? '' : errorMessage;

const useValidation = (data: { fields: Record<string, any>; validation: Validation }, isMultiple = false, submit :boolean = true, debounceDelay = 300 , validateAll = false) => {
    const [errors, setErrors] = useState<ValidationErrors>({ errors: {}, status: true });

    const { fields, validation } = data;
    const [fieldsInitailStaus,setFieldsInitailStaus] = useState<any>();
    const [submitted,setsubmitted] = useState(true);

    useEffect(()=>{
        let status = {...fields};
        Object.keys(fields).forEach((field)=> status[field] = false);
        setFieldsInitailStaus(status)
        setsubmitted(submit);
    },[])

    const validateC = () => {
        const newErrors: Record<string, string> |  any  = {};
        Object.keys(fields).forEach((field) => {
            const multipleMessages: string[]  = [];
            const value = fields[field];
            let error = '';

            const rules = validation.rules[field];
            const messages = validation?.messages?.[field];
            

            if (rules?.isRequired) {
                error = isRequiredCheck(value, messages?.isRequired || `Please enter the ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.maxLength !== undefined) {
                error = maxLengthCheck(value, rules.maxLength, messages?.maxLength || `The ${field} length should be at most ${rules.maxLength}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.minLength !== undefined) {
                error = minLengthCheck(value, rules.minLength, messages?.minLength || `The ${field} length should be at least ${rules.minLength}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.excludedCharacters) {
                error = excludedCharactersCheck(value, rules.excludedCharacters, messages?.excludedCharacters || `Please enter valid ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.regex) {
                error = regexCheck(value, rules.regex, messages?.regex || `The ${field} format is invalid`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.alpha) {
                error = alphaCheck(value, messages?.alpha || `Please enter valid ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.email) {
                error = emailCheck(value, messages?.email || `Please enter a valid ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.numeric) {
                error = numericCheck(value, messages?.numeric || `Please enter a valid ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.date) {
                error = isDateCheck(value, messages?.date || `Please enter a valid ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.alphaDash) {
                error = alphaWithDashCheck(value, messages?.alphaDash || `Please enter valid ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.alphaSpace) {
                error = alphaWithSpaceCheck(value, messages?.alphaSpace || `Please enter valid ${field}`);
                error?.length && multipleMessages.push(error);
            }
            if (!error && rules?.sameAsField) {
                const otherFieldValue = fields[rules.sameAsField];
                error = sameAsFieldCheck(value, messages?.sameAsField || `Please ensure ${field} matches ${rules.sameAsField}`, otherFieldValue);
                error?.length && multipleMessages.push(error);
            }
            if(!error.length){
                setFieldsInitailStaus({...fieldsInitailStaus,[field]:true})
            }
            if(fieldsInitailStaus[field] == true || submitted == true){
                newErrors[field] = !isMultiple ? error : multipleMessages;
            } 
        });

        if (JSON.stringify(errors.errors) !== JSON.stringify(newErrors)) {
            const status = Object.values(newErrors).every((error) => !error);
            setErrors({ errors: newErrors, status });
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            validateC()
        }, debounceDelay);

        return () => {
            clearTimeout(handler);
        };
    }, [fields, validation, debounceDelay, submitted]);

    useEffect(()=>{
        validateAll && setsubmitted(true)
    },[validateAll])

    return [errors];
};

export default useValidation;
