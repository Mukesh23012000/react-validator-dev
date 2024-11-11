import React, { ReactNode } from "react";
type InitialValues = {
    [key: string]: string | number;
};
interface DevFormProps {
    initialValues: InitialValues;
    children: ReactNode;
    changeField: (fields: Fields) => void;
}
interface Fields {
    [key: string]: string | number;
}
interface NewValue {
    key: string;
    value: string | number;
}
interface FieldContextType {
    fields: Fields;
    updateFields: (newValue: NewValue) => void;
}
export declare const FieldContext: React.Context<FieldContextType | undefined>;
declare const DevForm: React.FC<DevFormProps>;
export default DevForm;
