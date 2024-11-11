import React from 'react';
type FieldType = '' | 'input' | 'select' | 'textarea';
interface Props {
    as: FieldType;
    id: string;
    name: string;
    placeHolder: string;
    children?: React.ReactNode;
}
declare const Field: React.FC<Props>;
export default Field;
