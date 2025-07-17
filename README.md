# react-validator-dev

> A flexible and customizable real-time form validation library for React.

![npm](https://img.shields.io/npm/v/react-validator-dev)
![npm](https://img.shields.io/npm/dm/react-validator-dev)
![license](https://img.shields.io/npm/l/react-validator-dev)
![issues](https://img.shields.io/github/issues/Mukesh23012000/react-validator-dev)
![stars](https://img.shields.io/github/stars/Mukesh23012000/react-validator-dev?style=social)

---

## Installation

```bash 
npm install react-validator-dev
```

## Description

`react-validator-dev` provides a powerful `useValidation` hook for real-time and rule-based form validation in React applications.

## Features:

- **Flexible Validation Rules:** `required`, `regex`, `min/maxLength`, `email`, `numeric`, and more.
- **Custom Error Messages:** Friendly and specific messages per rule.
- **Real-time Validation:** Re-validates on every input change.
- **Field Dependencies:**  Supports sameAsField for confirm password, etc.
- **Debounced Checks:** Prevents excessive validations while typing.
- **Multiple Errors Support:** Return multiple errors per field (`isMultiple: true`).
- **Memoized Validations:** Uses memoization internally to cache validation results for better performance.

## Parameters

The `useValidation` hook accepts a single props object with the following properties:

| Parameter         | Type                                                                 | Required | Default | Description                                                                                             |
|-------------------|----------------------------------------------------------------------|----------|---------|-----------------------------------------------------------------------------------------------------|
| `fields`          | `Record<string, any>`                                                | Yes      | —       | An object representing the current values of the form fields. Keys are field names, values are inputs. |
| `validation`      | `{ rules: object; messages?: object }`                              | Yes      | —       | Object defining validation rules and optional custom error messages for each field.                   |
| `isMultiple`      | `boolean`                                                           | No       | `false` | If true, returns an array of error messages per field instead of just the first error string.         |
| `debounceDelay`   | `number`                                                            | No       | `300`   | Time in milliseconds to debounce the validation function, to optimize performance during fast input. |
| `customValidators`| `Record<string, (value: any, fields: any) => string \| null>`      | No       | —       | Custom validation functions per field, receiving the field value and all fields; return error string or null. |

### Details:

- **`fields`**: The source of truth for your form state, typically an object managed via React's `useState` or similar.
- **`validation.rules`**: Defines validation logic per field, e.g., `{ name: { isRequired: true, maxLength: 50 } }`.
- **`validation.messages`**: Optional custom error messages for each rule and field.
- **`isMultiple`**: Enables returning all validation errors per field instead of just the first.
- **`debounceDelay`**: Debounces validation calls during fast input, improving performance and UX.
- **`customValidators`**: Allows you to define custom validation logic per field; functions receive `(value, fields)` and return an error message string or `null`.


## Usage

1. **Define your form fields state and validation rules**

```jsx
import React, { useState } from 'react';
import {useValidation} from 'react-validator-dev';

const validation = {
  rules: {
    name: { isRequired: true, maxLength: 50 },
    email: { isRequired: true, email: true },
  },
  messages: {
    name: {
      isRequired: 'Name is required.',
      maxLength: 'Name cannot exceed 50 characters.',
    },
    email: {
      isRequired: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
  },
};

function MyForm() {
  const [fields, setFields] = useState({ name: '', email: '' });

  const { errors, isValid, touchedFields, markTouched } = useValidation({
    fields,
    validation,
    debounceDelay: 300,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    markTouched(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      // Submit form
      console.log('Submitting', fields);
    } else {
      // Mark all fields as touched to show errors
      Object.keys(fields).forEach(field => markTouched(field));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label><br />
        <input
          name="name"
          value={fields.name}
          onChange={handleChange}
          onBlur={() => markTouched('name')}
        />
        {touchedFields.name && errors.name && (
          <div style={{ color: 'red' }}>{errors.name}</div>
        )}
      </div>
      <div>
        <label>Email</label><br />
        <input
          name="email"
          value={fields.email}
          onChange={handleChange}
          onBlur={() => markTouched('email')}
        />
        {touchedFields.email && errors.email && (
          <div style={{ color: 'red' }}>{errors.email}</div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Return Value

The `useValidation` hook returns an object containing the following properties:

| Property       | Type                     | Description                                                                                   |
|----------------|--------------------------|-----------------------------------------------------------------------------------------------|
| `errors`       | `Record<string, string \| string[]>` | An object mapping field names to their error messages. If `isMultiple` is `true`, errors are arrays; otherwise, strings. |
| `isValid`      | `boolean`                | Indicates whether the entire form is valid (i.e., no validation errors present).              |
| `touchedFields`| `Record<string, boolean>`| Tracks which fields have been interacted with (marked as "touched"). Useful for controlling error display.  |
| `markTouched`  | `(field: string) => void`| A function to mark a specific field as touched. Should be called on field interaction (e.g., `onBlur`).         |
| `markAllTouched`  | `() => void`| A function to mark a all the fields as touched.         |
| `markUnTouched`  | `(field: string) => void`| A function to mark a specific field as untouched.         |
| `markAllUntouched`  | `() => void`| A function to mark a all the fields as touched.         |

---

### Example

```tsx
const { errors, isValid, touchedFields, markTouched } = useValidation({ fields, validation });

console.log(errors.name);          // Error message(s) for the 'name' field
console.log(isValid);              // true if no errors, false otherwise
console.log(touchedFields.email); // true if the email field was touched by the user

// Mark a field as touched
markTouched('password');
```
## Validation Rules

### 1. `isRequired`
- **Description**: Checks if the field is mandatory. If the field is empty, it will trigger an error.
- **Type**: `boolean`
- **Default**: `false`

### 2. `maxLength`
- **Description**: Specifies the maximum allowable length for the field input. If the input exceeds this length, an error will be triggered.
- **Type**: `number`
- **Default**: `-`

### 3. `minLength`
- **Description**: Sets the minimum required length for the field input. If the input is shorter than this length, an error will be triggered.
- **Type**: `number`
- **Default**: `-`

### 4. `excludedCharacters`
- **Description**: An array of characters that are not allowed in the input. If any of these characters are present, an error will be triggered.
- **Type**: `string[]`
- **Default**: `-`

### 5. `regex`
- **Description**: A regular expression string used to validate the field input format. If the input does not match this regex, an error will be triggered.
- **Type**: `string`
- **Default**: `-`

### 6. `alpha`
- **Description**: Checks if the field input contains only alphabetic characters (A-Z, a-z). An error will be triggered if any non-alphabetic characters are present.
- **Type**: `boolean`
- **Default**: `false`

### 7. `email`
- **Description**: Validates that the field input is in a proper email format. An error will be triggered if the input does not conform to standard email formatting rules.
- **Type**: `boolean`
- **Default**: `false`

### 8. `numeric`
- **Description**: Ensures that the field input contains only numeric characters (0-9). An error will be triggered if any non-numeric characters are present.
- **Type**: `boolean`
- **Default**: `false`

### 9. `date`
- **Description**: Checks if the field input is in a valid date format (e.g., YYYY-MM-DD). An error will be triggered if the input does not conform to this format or is not a valid date.
- **Type**: `boolean`
- **Default**: `false`

### 10. `alphaDash`
- **Description**: Validates that the field input contains only alphabetic characters and dashes (-). An error will be triggered if any other characters are present.
- **Type**: `boolean`
- **Default**: `false`

### 11. `alphaSpace`
- **Description**: Ensures that the field input contains only alphabetic characters and spaces. An error will be triggered if any non-alphabetic or non-space characters are present.
- **Type**: `boolean`
- **Default**: `false`

### 12. `sameAsField`
- **Description**: Validates that the field input matches the value of another specified field. An error will be triggered if the values do not match.
- **Type**: `string` (field name to match)
- **Default**: `-`

### 13. `custom`
- **Description**: Allows passing a custom validation function for the field. This function receives the current field value and all fields as arguments. It should return a string error message if invalid, or an empty string/null if valid.
- **Type**: `(value: any, fields: Record<string, any>) => string | null`
- **Default**: `-`
- **Example**:
  ```js
  custom: (value, fields) => {
    if (value !== fields.otherField) return "Values do not match!";
    return null;
  }
  ```

## Error Messages

You can define custom error messages for each validation rule inside the `messages` object for each field. If no custom message is provided, a default error message will be used.
- **Example**:
```js
  messages: {
    username: {
      isRequired: "Username is mandatory!",
      maxLength: "Username cannot exceed 15 characters.",
    },
    password: {
      custom: "Password must include a special character.",
    }
  }
```

## Get Started:

Start improving user experience in your forms by implementing real-time validation with ease!

---

Feel free to customize or extend the validation rules and messages to perfectly fit your application needs.
