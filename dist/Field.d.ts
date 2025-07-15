import React from 'react';
type FieldType = '' | 'input' | 'select' | 'textarea';
interface Style {
    [key: string]: string | number;
}
interface Props {
    as: FieldType;
    id?: string;
    name: string;
    placeHolder?: string;
    children?: React.ReactNode;
    className?: string;
    style?: Style;
    type?: string;
    change?: (value: string | number) => void;
    input?: (value: string | number) => void;
    click?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    focus?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    blur?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error?: string | string[];
    errorClassName?: string;
    errorStyle?: Style;
    validate?: boolean;
}
declare const Field: React.FC<Props>;
export default Field;
//# sourceMappingURL=Field.d.ts.map