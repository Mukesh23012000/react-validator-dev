# react-validator-dev
NPM package that provides real-time error messaging and supports field dependencies.

## Installation

```bash
npm install react-validator-dev
```
## Description

The `useValidation` hook provides a customizable validation solution for React forms. It allows developers to define various validation rules and error messages for form fields, ensuring user input meets specified criteria.

## Features:

- **Flexible Validation Rules:** Supports multiple validation options including required fields, max/min length, regex patterns, character exclusions, and specific formats (email, numeric, date).
- **Custom Error Messages:** Allows for personalized error messages for each validation rule, making it easy to inform users of specific input issues.
- **Dynamic Validation:** Automatically validates fields whenever their values change, providing real-time feedback.
- **Field Dependency Checks:** Supports rules that require values to match another field, useful for confirmations like passwords.

## Usage:

1. Define your validation rules and messages.
2. Pass your form data and validation configuration to the `useValidation` hook.
3. Access the error messages and validation status to manage form submission and display feedback.


## Example:

```javascript
const { fields, validation } = {
  fields: { username: '', email: '' },
  validation: {
    rules: {
      username: { isRequired: true, maxLength: 15 },
      email: { isRequired: true, email: true },
    },
    messages: {
      username: {
        isRequired: 'Username is required.',
        maxLength: 'Username must be at most 15 characters.',
      },
      email: {
        isRequired: 'Email is required.',
        email: 'Please enter a valid email address.',
      },
    },
  },
};

const [{errors,status}] = useValidation({ fields, validation });

const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.status) {
        console.log("Form submitted successfully!", fields);
    } else {
        console.log("There are validation errors:", errors.errors);
    }
};
```


## Return Value:

- An object containing error messages for each field and a validation status indicating if all fields are valid.

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
- **Type**: `string`
- **Default**: `-`

## Error Messages

You can define custom error messages for each validation rule under the `messages` property. If not provided, default messages will be used.


## Get Started:

Start improving user experience in your forms by implementing real-time validation with ease!

---

Feel free to adjust any part of the description to better match your vision or the features you want to emphasize!