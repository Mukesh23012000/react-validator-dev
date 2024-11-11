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
    type?: string;
    change? : (value:string | number) => void;
    input? : (value:string | number) => void;
}

const Field: React.FC<Props> = ({ as = 'input', id="", name="", placeHolder="",className = "", type="", style={}, change, input, children }) => {
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
        if(change){
            change(e.target.value);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if(input){
            input(e.target.value);
        }
    };

    switch (fieldType) {
        case 'input':
            return <input id={id} name={name} placeholder={placeHolder} value={value} onInput={(e)=> handleInput} onChange={handleChange} style={style} className={className} type={type} />;
        case 'textarea':
            return (
                <textarea id={id} name={name} placeholder={placeHolder} value={value} onInput={(e)=> handleInput}  onChange={handleChange} style={style} className={className} >
                    {children}
                </textarea>
            );
        case 'select':
            return (
                <select id={id} name={name} value={value} onInput={(e)=> handleInput}  onChange={handleChange} style={style} className={className} >
                    {children}
                </select>
            );
        default:
            return <input id={id} name={name} placeholder={placeHolder} value={value} onInput={(e)=> handleInput}  onChange={handleChange} style={style} className={className} type={type}  />;
    }
};

export default Field;
