import React, { useContext, useState, useEffect } from 'react';
import { FieldContext } from './DevForm';

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
}

const Field: React.FC<Props> = ({
    as = 'input',
    id = "",
    name = "",
    placeHolder = "",
    className = "",
    type = "",
    style = {},
    change = "",
    input = "",
    click = "",
    focus = "",
    blur = "",
    children
}) => {
    const debounceDelay = 300;
    const [fieldType, setFieldType] = useState<FieldType>(as);
    const [value, setValue] = useState<string | number>('');
    const { fields, updateFields } = useContext<any>(FieldContext);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (fields && name in fields && fields[name] !== value) {
                setValue(fields[name]);
            }
        }, debounceDelay);

        return () => {
            clearTimeout(handler);
        };
    }, [fields, name, value]);

    useEffect(() => {
        updateFields({ key: name, value });
    }, [value, name, updateFields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (typeof change === 'function') {
            change(newValue);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (typeof input === 'function') {
            input(e.target.value);
        }
    };

    const handleClick = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (typeof click === 'function') {
            click(e);
        }
    };
    const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (typeof focus === 'function') {
            focus(e);
        }
    };
    const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (typeof blur === 'function') {
            blur(e);
        }
    };

    switch (fieldType) {
        case 'input':
            return (
                <input
                    id={id}
                    name={name}
                    placeholder={placeHolder}
                    value={value}
                    onInput={(e)=>handleInput}
                    onChange={handleChange}
                    style={style}
                    className={className}
                    type={type}
                    onClick={(e)=>handleClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            );
        case 'textarea':
            return (
                <textarea
                    id={id}
                    name={name}
                    placeholder={placeHolder}
                    value={value}
                    onInput={(e)=>handleInput}
                    onChange={handleChange}
                    style={style}
                    className={className}
                    onClick={(e)=>handleClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {children}
                </textarea>
            );
        case 'select':
            return (
                <select
                    id={id}
                    name={name}
                    value={value}
                    onInput={(e)=>handleInput}
                    onChange={handleChange}
                    style={style}
                    className={className}
                    onClick={(e)=>handleClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {children}
                </select>
            );
        default:
            return (
                <input
                    id={id}
                    name={name}
                    placeholder={placeHolder}
                    value={value}
                    onInput={(e)=>handleInput}
                    onChange={handleChange}
                    style={style}
                    className={className}
                    type={type}
                    onClick={(e)=>handleClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            );
    }
};

export default Field;
