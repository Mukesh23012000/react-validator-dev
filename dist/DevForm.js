import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, createContext } from "react";
export const FieldContext = createContext(undefined);
const DevForm = ({ initialValues = {}, children, changeField = "", submit = "" }) => {
    const [fields, setFields] = useState(initialValues);
    const updateFields = (newValue) => {
        const { key, value } = newValue;
        setFields((prevFields) => (Object.assign(Object.assign({}, prevFields), { [key]: value })));
    };
    useEffect(() => {
        if (typeof changeField === "function") {
            changeField(fields);
        }
    }, [fields]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof submit === "function") {
            submit(fields);
        }
    };
    return (_jsx(FieldContext.Provider, { value: { fields, updateFields }, children: _jsx("form", { onSubmit: handleSubmit, children: children }) }));
};
export default DevForm;
//# sourceMappingURL=DevForm.js.map