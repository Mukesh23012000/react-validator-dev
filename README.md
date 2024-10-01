# react-validator-dev
NPM package that provides real-time error messaging and supports field dependencies.

# react-validator-dev

A React hook for form validation.

## Installation

```bash
npm install react-validator-dev

---

### React Validation Hook

**Description:**

The `useValidation` hook provides a customizable validation solution for React forms. It allows developers to define various validation rules and error messages for form fields, ensuring user input meets specified criteria.

**Features:**

- **Flexible Validation Rules:** Supports multiple validation options including required fields, max/min length, regex patterns, character exclusions, and specific formats (email, numeric, date).
- **Custom Error Messages:** Allows for personalized error messages for each validation rule, making it easy to inform users of specific input issues.
- **Dynamic Validation:** Automatically validates fields whenever their values change, providing real-time feedback.
- **Field Dependency Checks:** Supports rules that require values to match another field, useful for confirmations like passwords.

**Usage:**

1. Define your validation rules and messages.
2. Pass your form data and validation configuration to the `useValidation` hook.
3. Access the error messages and validation status to manage form submission and display feedback.

**Example:**

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

const [errors] = useValidation({ fields, validation });
```

**Return Value:**

- An object containing error messages for each field and a validation status indicating if all fields are valid.

**Installation:**

```bash
npm install your-validation-package-name
```

**Get Started:**

Start improving user experience in your forms by implementing real-time validation with ease!

---

Feel free to adjust any part of the description to better match your vision or the features you want to emphasize!