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
      </form>
    </div>
  );
}

export default App;
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