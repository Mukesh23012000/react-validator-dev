export type ValidationRule = {
    isRequired?: boolean;
    maxLength?: number;
    minLength?: number;
    excludedCharacters?: string[];
    regex?: string | any;
    alpha?: boolean;
    email?: boolean;
    numeric?: boolean;
    date?: boolean;
    alphaDash?: boolean;
    alphaSpace?: boolean;
    sameAsField?: string;
    custom?: boolean;
}

export type ErrorMessage = {
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

export interface Validation {
    rules: { [key: string]: ValidationRule };
    messages?: { [key: string]: ErrorMessage };
}

export interface ReturnAPIs {
    errors: Record<string, string | string[]>;
    isValid: boolean;
    touchedFields: Record<string, boolean>;
}

export type CustomValidator = (value: any, fields: Record<string, any>) => string;

export interface ValidateProps{
    fields : Record<string, any>,
    validation: Validation,
    customValidators?:  Record<string, CustomValidator>,
    isMultiple?: boolean,
    debounceDelay?: number
}