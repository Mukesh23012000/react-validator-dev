export declare const validators: {
    isRequired: (data: any, msg: string) => string;
    maxLength: (data: any, max: number, msg: string) => string;
    minLength: (data: any, min: number, msg: string) => string;
    excludedCharacters: (data: any, chars: string[], msg: string) => string;
    regex: (data: any, regex: string, msg: string) => string;
    alpha: (data: any, msg: string) => string;
    alphaDash: (data: string, msg: string) => string;
    alphaSpace: (data: string, msg: string) => string;
    numeric: (data: string, msg: string) => string;
    email: (data: string, msg: string) => string;
    date: (data: string, msg: string) => string;
    sameAsField: (data: string, other: string, msg: string) => string;
};
//# sourceMappingURL=validators.d.ts.map