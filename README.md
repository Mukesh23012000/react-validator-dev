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
import { useValidation } from 'react-validator-dev';

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

  const handleSubmit = (event) => {
      setFormSubmitStatus(true)
      event.preventDefault()
      if(error.status === true){
        submitUserDetails(fields)
      }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type='text' name="name" value={fields.name}  onChange={(e)=>setFields({...fields,name: e.target.value})}/>
          <span style={{color:'red'}}> {error.errors?.name} </span>
        </div>
        <div>
          <label>Email</label>
          <input type='text' name="email" value={fields.email}  onChange={(e)=>setFields({...fields,email: e.target.value})} />
          <span style={{color:'red'}}> {error.errors?.email} </span>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
```
## Example with multiple errors for same field:
```javascript 
import { useState } from 'react';
import { useValidation } from 'react-validator-dev';

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

    const [error] = useValidation({ fields, validation }, true); // Set isMultiple to true

    const handleSubmit = (event) => {
        event.preventDefault();
        if (error.status) {
            submitUserData(fields);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={fields.username} onChange={(e) => setFields({ ...fields, username: e.target.value })} />
                {error.errors?.username && (
                    <ul>
                        {error.errors.username.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={fields.password} onChange={(e) => setFields({ ...fields, password: e.target.value })} />
                {error.errors?.password && (
                    <ul>
                        {error.errors.password.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
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


## Get Started:

Start improving user experience in your forms by implementing real-time validation with ease!

---

Feel free to adjust any part of the description to better match your vision or the features you want to emphasize!