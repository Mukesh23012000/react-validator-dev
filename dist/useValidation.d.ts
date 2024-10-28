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
    rules: {
        [key: string]: ValidationRule;
    };
    messages?: {
        [key: string]: ErrorMessage;
    };
}
interface ValidationErrors {
    errors: Record<string, string>;
    status: boolean;
}
declare const useValidation: (data: {
    fields: Record<string, any>;
    validation: Validation;
}, isMultiple?: boolean, submitted?: boolean, debounceDelay?: number) => ValidationErrors[];
export default useValidation;
