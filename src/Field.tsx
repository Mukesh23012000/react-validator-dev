// Example of `Field` component
import React, { useContext, useState, useEffect } from 'react';
import { FieldContext } from './DevForm';

type FieldType = '' | 'input' | 'select' | 'textarea';
interface Style {
    [key: string]: string | number ;
  }

interface Props {
    as: FieldType;
    id?: string;
    name: string;
    placeHolder?: string;
    children?: React.ReactNode;
    className? : string;
    style? : Style;
}

const Field: React.FC<Props> = ({ as = 'input', id="", name="", placeHolder="",className = "", style={}, children }) => {
    const debounceDelay = 300;
    const [fieldType, setFieldType] = useState<FieldType>(as);
    const [value, setValue] = useState<string | number>('');
    const { fields, updateFields } = useContext<any>(FieldContext);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (fields && name in fields) {
                setValue(fields[name]);
            }
        }, debounceDelay);

        return () => {
            clearTimeout(handler);
        };
    }, [fields]);

    useEffect(() => {
        updateFields({ key: name, value });
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    switch (fieldType) {
        case 'input':
            return <input id={id} name={name} placeholder={placeHolder} value={value} onChange={handleChange} className={className} />;
        case 'textarea':
            return (
                <textarea id={id} name={name} placeholder={placeHolder} value={value} onChange={handleChange} className={className} >
                    {children}
                </textarea>
            );
        case 'select':
            return (
                <select id={id} name={name} value={value} onChange={handleChange} className={className}>
                    {children}
                </select>
            );
        default:
            return <input id={id} name={name} placeholder={placeHolder} value={value} onChange={handleChange} className={className}  />;
    }
};

export default Field;
