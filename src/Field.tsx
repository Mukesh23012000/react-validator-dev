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
    error?: string | string[];
    errorClassName?: string;
    errorStyle?: Style
    validate? : boolean;
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
    error = "",
    errorClassName = "",
    errorStyle = { color: 'red' },
    validate = false,
    children,
    ...props
}) => { 
    const debounceDelay = 300;
    const [fieldType, setFieldType] = useState<FieldType>(as);
    const [value, setValue] = useState<string | number>('');
    const { fields, updateFields } = useContext<any>(FieldContext);
    const [showError,setShowError] = useState<boolean>(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (fields && name in fields && fields[name] !== value) {
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

    useEffect(()=>{
        setShowError(validate)
    },[validate])

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
        setShowError(true);
        if (typeof blur === 'function') {
            blur(e);
        }
    };

    switch (fieldType) {
        case 'input':
            return (
                <>
                    <input
                        id={id}
                        name={name}
                        placeholder={placeHolder}
                        value={value}
                        onInput={(e) => handleInput}
                        onChange={handleChange}
                        style={style}
                        className={className}
                        type={type}
                        onClick={(e) => handleClick}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    />
                    {showError && <span className={errorClassName} style={errorStyle}>{error}</span>}
                </>
            );
        case 'textarea':
            return (
                <>
                    <textarea
                        id={id}
                        name={name}
                        placeholder={placeHolder}
                        value={value}
                        onInput={(e) => handleInput}
                        onChange={handleChange}
                        style={style}
                        className={className}
                        onClick={(e) => handleClick}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    >
                        {children}
                    </textarea>
                    {showError && <span className={errorClassName} style={errorStyle}>{error}</span>}
                </>
            );
        case 'select':
            return (
                <>
                    <select
                        id={id}
                        name={name}
                        value={value}
                        onInput={(e) => handleInput}
                        onChange={handleChange}
                        style={style}
                        className={className}
                        onClick={(e) => handleClick}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    >
                        {children}
                    </select>
                    {showError && <span className={errorClassName} style={errorStyle}>{error}</span>}
                </>
            );
        default:
            return (
                <>
                    <input
                        id={id}
                        name={name}
                        placeholder={placeHolder}
                        value={value}
                        onInput={(e) => handleInput}
                        onChange={handleChange}
                        style={style}
                        className={className}
                        type={type}
                        onClick={(e) => handleClick}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    />
                    {showError && <span className={errorClassName} style={errorStyle}>{error}</span>}
                </>
            );
    }
};

export default Field;
