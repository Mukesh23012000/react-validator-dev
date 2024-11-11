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
}
declare const Field: React.FC<Props>;
export default Field;
