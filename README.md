# react-validator-dev
An NPM package providing real-time error messaging and supporting field dependencies for React forms.

## Installation

```bash
npm install react-validator-dev
```
## Description

The `useValidation` hook provides a customizable validation solution for React forms. It allows developers to define various validation rules and error messages for form fields, ensuring user input meets specified criteria.

The `Field` component is a reusable, flexible component that abstracts the form input fields (`input`, `textarea`, `select`, etc.). It allows you to define different types of fields and pass additional properties such as `placeholder`, `style`, and `className`.

`DevForm` is used to wrap your entire form, and it manages the form’s state and submission process. You pass in initial values, a function to handle field changes `(changeField)`, and optionally a submit function `(submit)`.

## Features:

- **Flexible Validation Rules:** Supports multiple validation options including required fields, max/min length, regex patterns, character exclusions, and specific formats (email, numeric, date).
- **Custom Error Messages:** Allows for personalized error messages for each validation rule, making it easy to inform users of specific input issues.
- **Dynamic Validation:** Automatically validates fields whenever their values change, providing real-time feedback.
- **Field Dependency Checks:** Supports rules that require values to match another field, useful for confirmations like passwords.
-**Debouncing:** Reduces the frequency of validation checks during rapid input, enhancing performance and user experience.

## Parameters:
  1. **fields:**  An object representing the current values of your form fields. The keys of this object should match the field names defined in your validation rules. This parameter is crucial as it allows the validation hook to assess the current state of each field.
  2. **validation:** An object that defines the validation rules and corresponding error messages for each field in your form. This object should contain two properties:
      - ***rules:*** An object where each key corresponds to a field name, and the value is an object specifying the validation rules for that field.
      - ***messages (optional):*** An object containing custom error messages for each field and validation rule. If not provided, default messages will be used.
  3. **isMultiple (optional):** When set to true, this parameter enables the hook to return an    array of error messages for each field instead of a single error string. This is useful for scenarios where multiple validation rules can fail simultaneously for a single field. The default value is false.
  4. **submitted (optional):** Indicates whether the form has been submitted. This can trigger validation checks when the form is submitted. If set to true, the hook will validate all fields even if they have not changed. This is helpful for ensuring all fields are validated before final submission.
  5.**debounceDelay (optional):** Specifies the delay (in milliseconds) for the debounce functionality. This helps reduce the frequency of validation checks while the user is typing. The default value is 300 milliseconds, but this can be adjusted based on the needs of your application

## Usage:

1. Define your validation rules and messages.
2. Pass your form data, validation configuration, and the submitted form status to the useValidation hook.
3. Access the error messages and validation status to manage form submission and display feedback.
5. Optionally, specify a debounce delay (in milliseconds) to control the timing of validation checks.

## Example:

```javascript
import { useState } from 'react';
import { useValidation, Field, DevForm } from 'react-validator-dev';

function App() {

  const [fields,setFields] = useState({
    name:"",
    email:""
  });

  const [formSubmitStatus,setFormSubmitStatus] = useState(false)

  const validation = {
    rules :{
      name : {
        isRequired: true
      },
      email : {
        isRequired: true,
        email : true
      }
    },
    messages :{
      name : {
        isRequired : 'Whoops! Please tell us your name!'
      },
      email : {
        isRequired : 'Oops! We need your email to keep the fun going!',
        email: 'Oops! That email looks a bit wonky. Can you try a valid one?'
      }
    }
  }
  const [error] = useValidation({fields,validation})

  const handleFieldChange = (fieldValues:any) => {
    setFields(fieldValues)
  }

  const handleSubmit = (event) => {
      setFormSubmitStatus(true)
      event.preventDefault()
      if(error.status === true){
        submitUserDetails(fields)
      }
  }

  return (
    <div className="App">
      <DevForm initialValues={fields} changeField={handleFieldChange} submit={handleSubmit}>
        <div>
          <label>Name</label>
          <Field type='text' name="name" />
          <span style={{color:'red'}}> {error.errors?.name} </span>
        </div>
        <div>
          <label>Email</label>
          <Field type='text' name="email" />
          <span style={{color:'red'}}> {error.errors?.email} </span>
        </div>
        <button type='submit'>Submit</button>
      </DevForm>
    </div>
  );
}

export default App;
```
## Example with multiple errors for same field:
```javascript 
import { useState } from 'react';
import { useValidation, Field, DevForm } from 'react-validator-dev';

function MyForm() {
    const [fields, setFields] = useState({
    username: '',
    password: '',
});

const validation = {
    rules: {
        username: {
            isRequired: true,
            maxLength: 10,
            excludedCharacters: ['@', '#'],
        },
        password: {
            isRequired: true,
            minLength: 6,
            maxLength: 12,
        },
    },
    messages: {
        username: {
            isRequired: 'Username is required.',
            maxLength: 'Username must be 10 characters or less.',
            excludedCharacters: 'Username cannot contain @ or #.',
        },
        password: {
            isRequired: 'Password is required.',
            minLength: 'Password must be at least 6 characters long.',
            maxLength: 'Password cannot exceed 12 characters.',
        },
    },
};

const [error]:any = useValidation({ fields, validation }, true); // Set isMultiple to true

const handleFieldChange = (fieldValues:any) => {
  setFields(fieldValues)
}

const handleSubmit = (event:any) => {
    event.preventDefault();
    if (error.status) {
        submitUserData(fields);
    }
};

return (
    <DevForm initialValues={fields} changeField={handleFieldChange} submit={handleSubmit}>
        <div>
            <label>Username:</label>
            <Field name="username" id="username" placeHolder="Enter your username" as="input" />
            {error.errors?.username && (
                <ul>
                    {error.errors.username?.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )}
        </div>
        <div>
            <label>Password:</label>
            <Field name="password" id="password" placeHolder="Enter your password" as="input" />
            {error.errors?.password && (
                <ul>
                    {error.errors.password?.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )}
        </div>
    </DevForm>);
}
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

## `DevForm` Props
### 1. initialValues :
- **Description**: This is an object that defines the initial state of the form fields. Each key in the object represents the name of a field, and its value can be a `string` or `number`.
- **Type**: `{ [key: string]: string | number }`
- **Example**: `{ name: '', email: '' }`

### 2. changeField :
- **Description**: This function is called whenever any field in the form is updated. The `fields` parameter passed to this function contains the current state of the entire form.
- **Type**: `function`
- **Example**: `If a user updates the name field, changeField will be called with the updated fields object.`

### 3. submit :
- **Description**: This optional function will be called when the form is submitted. The fields object passed to it will contain the current state of all form fields. If not provided, the form will not have a custom submit handler.
- **Type**: `function`
- **Example**: `If you want to send the form data to an API when the form is submitted, you would pass a submit function here.`

### 4. children :
- **Description**: This prop represents the form fields (or any other components) that will be nested inside the DevForm. Typically, this is where you include the Field components.
- **Type**: `ReactNode`
- **Example**: `<Field name="name" as="input" /> will be nested as a child`


## `Field` Props
### 1. as :
- **Description**: This prop determines the type of field to render.
- **Type**: `('' | 'input' | 'select' | 'textarea')`
- **Default**: `input`

### 2. id :
- **Description**: This is an optional id for the field, which can be used for associating the field with a <label> or for styling.
- **Type**: `string` (optional)
- **Default**: ``

### 3. name :
- **Description**: The name of the field. This is a key in the form's state object (fields) and must be unique for each field.
- **Type**: `string` (optional)
- **Default**: ``

### 4. placeHolder :
- **Description**: This is an optional placeholder text to display inside the field when it's empty. It's typically used for input and textarea fields.
- **Type**: `string` (optional)
- **Default**: ``

### 5. className :
- **Description**: This is an optional CSS class to apply custom styling to the field.
- **Type**: `string` (optional)
- **Default**: ``

### 6. style :
- **Description**: This is an optional inline style object that can be applied to the field for custom styling.
- **Type**: `Style ({ [key: string]: string | number })` (optional)
- **Default**: ``

### 7. change :
- **Description**: A callback function that gets called whenever the field value changes. The value is passed to the change function.
- **Type**: `function` (optional)
- **Default**: ``

### 8. input :
- **Description**: A callback function to be called when the input value changes. Unlike change, this function is triggered during the input change event and can be useful for things like real-time validation or calculations.
- **Type**: `function` (optional)
- **Default**: ``

### 4. children :
- **Description**: This is used to pass children elements to the field. For example, if the field type is 'select', the options will be passed here.
- **Type**: `ReactNode`

## Get Started:

Start improving user experience in your forms by implementing real-time validation with ease!

---

Feel free to adjust any part of the description to better match your vision or the features you want to emphasize!