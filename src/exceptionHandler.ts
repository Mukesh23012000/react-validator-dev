import { ValidateProps } from "./types";

export function mandatoryProps(props: ValidateProps): Pick<ValidateProps, 'fields' | 'validation' > {
  if (!Object.prototype.hasOwnProperty.call(props, 'fields')) {
    throw new Error("`fields` is required for the useValidation hook");
  }

  if (!Object.prototype.hasOwnProperty.call(props, 'validation')) {
    throw new Error("`validation` is required for the useValidation hook");
  }

  if ( typeof props.validation !== 'object' || !Object.prototype.hasOwnProperty.call(props.validation, 'rules')) {
    throw new Error("`rules` inside `validation` is required for the useValidation hook");
  }
  return {fields:props.fields,validation: props.validation}
}

export function optionalProps(props: ValidateProps):  Pick<ValidateProps, 'isMultiple' | 'debounceDelay' | 'customValidators' >  {
    const opProps: Pick<ValidateProps, "isMultiple" | "debounceDelay" | "customValidators"> = {
        isMultiple: false,
        debounceDelay: 300,
        customValidators: undefined,
    };
  
    if (Object.prototype.hasOwnProperty.call(props, 'isMultiple')) {
      if (typeof props.isMultiple === 'boolean') {
        opProps.isMultiple = props.isMultiple;
      } else {
        throw new Error("`isMultiple` should be a boolean for the useValidation hook");
      }
    }
  
    if (Object.prototype.hasOwnProperty.call(props, 'debounceDelay')) {
      if (typeof props.debounceDelay === 'number') {
        opProps.debounceDelay = props.debounceDelay;
      } else {
        throw new Error("`debounceDelay` should be a number for the useValidation hook");
      }
    }
  
    if ("isMultiple" in props) {
        if (typeof props.isMultiple === "boolean") {
          opProps.isMultiple = props.isMultiple;
        } else {
          throw new Error("`isMultiple` should be a boolean for the useValidation hook");
        }
      }
    
      if ("debounceDelay" in props) {
        if (typeof props.debounceDelay === "number") {
          opProps.debounceDelay = props.debounceDelay;
        } else {
          throw new Error("`debounceDelay` should be a number for the useValidation hook");
        }
      }
    
      if ("customValidators" in props) {
        if (typeof props.customValidators === "object" || props.customValidators === undefined) {
          opProps.customValidators = props.customValidators;
        } else {
          throw new Error("`customValidators` should be an object with validation functions");
        }
      }
    
      return opProps;
  }
  