import { ValidateProps } from "./types";
declare const useValidation: (props: ValidateProps) => {
    markTouched: (field: string) => void;
    markAllTouched: () => void;
    markUnTouched: (field: string) => void;
    markAllUntouched: () => void;
    errors: Record<string, string>;
    isValid: boolean;
    touchedFields: Record<string, boolean>;
};
export default useValidation;
//# sourceMappingURL=useValidation.d.ts.map