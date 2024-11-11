import React, { useEffect, useState, createContext, ReactNode } from "react";

type InitialValues = {
  [key: string]: string | number ;
};

interface DevFormProps {
  initialValues: InitialValues;
  children: ReactNode;
  changeField: (fields: Fields) => void;
}

interface Fields {
  [key: string]: string | number ;
}

interface NewValue {
  key: string;
  value: string | number ;
}

interface FieldContextType {
  fields: Fields;
  updateFields: (newValue: NewValue) => void;
}

export const FieldContext = createContext<FieldContextType | undefined>(undefined);

const DevForm: React.FC<DevFormProps> = ({ initialValues, children, changeField }) => {

  const [fields, setFields] = useState<Fields>(initialValues);

  const updateFields = (newValue: NewValue) => {
    const { key, value } = newValue;
    setFields((prevFields) => ({ ...prevFields, [key]: value }));
  };

  useEffect(() => {
    changeField(fields)
  }, [fields]);

  return (
    <FieldContext.Provider value={{ fields, updateFields }}>
      {children}
    </FieldContext.Provider>
  );
};

export default DevForm;