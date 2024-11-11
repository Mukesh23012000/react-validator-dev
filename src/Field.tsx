// Example of `Field` component
import React, { useContext, useState, useEffect } from 'react';
import { FieldContext } from './DevForm';

type FieldType = '' | 'input' | 'select' | 'textarea';

interface Props {
  as: FieldType;
  id: string;
  name: string;
  placeHolder: string;
  children?: React.ReactNode;
}

const Field: React.FC<Props> = ({ as = 'input', id, name, placeHolder, children }) => {
  const [fieldType, setFieldType] = useState<FieldType>(as);
  const [value, setValue] = useState<string | number>('');
  const { fields, updateFields } = useContext<any>(FieldContext);

  useEffect(() => {
    if (fields && name in fields) {
      setValue(fields[name]);
    }
  }, [fields]);

  useEffect(() => {
    updateFields({ key: name, value });
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  switch (fieldType) {
    case 'input':
      return <input id={id} name={name} placeholder={placeHolder} value={value} onChange={handleChange} />;
    case 'textarea':
      return (
        <textarea id={id} name={name} placeholder={placeHolder} value={value} onChange={handleChange}>
          {children}
        </textarea>
      );
    case 'select':
      return (
        <select id={id} name={name} value={value} onChange={handleChange}>
          {children}
        </select>
      );
    default:
      return <input id={id} name={name} placeholder={placeHolder} value={value} onChange={handleChange} />;
  }
};

export default Field;
