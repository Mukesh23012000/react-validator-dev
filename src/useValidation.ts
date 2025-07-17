import { useState, useEffect, useMemo } from "react";
import { ValidateProps, ReturnAPIs } from "./types";
import { mandatoryProps, optionalProps } from "./exceptionHandler";
import { validators } from "./validators";

const useValidation = (props:ValidateProps) => {

  //Exception handling for props
  const { fields, validation } = mandatoryProps(props);
  const { isMultiple, debounceDelay, customValidators} = optionalProps(props);

  const [returnAPIs, setReturnAPIs] = useState<ReturnAPIs>({
    errors: {},
    isValid: false,
    touchedFields: {},
  });

  const markTouched = (field: string): void => {
    setReturnAPIs((prev) => ({
      ...prev,
      touchedFields: {
        ...prev.touchedFields,
        [field]: true,
      },
    }));
  };

  const markUnTouched = (field: string): void => {
    setReturnAPIs((prev) => ({
      ...prev,
      touchedFields: {
        ...prev.touchedFields,
        [field]: false,
      },
    }));
  };

  const allUntouchedFields = useMemo(() => {
    return Object.fromEntries(Object.keys(fields).map((key) => [key, true]));
  }, [fields]);

  const allTouchedFields = useMemo(() => {
    return Object.fromEntries(Object.keys(fields).map((key) => [key, true]));
  }, [fields]);

  const markAllTouched = (): void => {
    setReturnAPIs((prev) => ({
      ...prev,
      touchedFields: allTouchedFields,
    }));
  };

  const markAllUntouched = (): void => {
    setReturnAPIs((prev) => ({
      ...prev,
      touchedFields: allUntouchedFields,
    }));
  };

  const mRules = useMemo(() => validation.rules, [validation]);
  const mMessages = useMemo(() => validation.messages || {}, [validation]);

  const validate = ():void => {
    const newErrors:Record<string, string> | any = {};

    Object.keys(fields).forEach((field) => {
      const value = fields[field];
      const rules = mRules[field];
      if (!rules) return;
      const messages = mMessages[field] || {};
      const multipleMessages: string[] = [];
      let hasError = false;

      // isRequired check
      if(rules.isRequired){
        const error = validators.isRequired(value, messages.isRequired || `Please enter the ${field}`);
        if(error){
          multipleMessages.push(error);
          hasError = true;
          if(!isMultiple){
            newErrors[field] = error;
            return;
          }
        }
      }

      // Custom validator check 
      if (rules.custom && customValidators?.[field]) {
        const error = customValidators[field](value, fields);
        if (error) {
          if (!isMultiple) {
            newErrors[field] = error;
            return;
          } else {
            multipleMessages.push(error);
          }
        }
      }

      // Additional checks if not failed by isRequired
      if(!hasError || isMultiple){
        const checks: [string, any][] = Object.entries(rules).filter(([key]) => key !== "isRequired");

        for (const [rule, ruleValue] of checks) {
          let error = "";
          switch (rule) {
            case "maxLength":
              error = validators.maxLength(value, ruleValue, messages.maxLength || `The ${field} length should be at most ${ruleValue}`);
              break;
            case "minLength":
              error = validators.minLength(value, ruleValue, messages.minLength || `The ${field} length should be at least ${ruleValue}`);
              break;
            case "excludedCharacters":
              error = validators.excludedCharacters(value, ruleValue, messages.excludedCharacters || `Please enter valid ${field}`);
              break;
            case "regex":
              error = validators.regex(value, ruleValue, messages.regex || `The ${field} format is invalid`);
              break;
            case "alpha":
              error = validators.alpha(value, messages.alpha || `Please enter valid ${field}`);
              break;
            case "alphaDash":
              error = validators.alphaDash(value, messages.alphaDash || `Please enter valid ${field}`);
              break;
            case "alphaSpace":
              error = validators.alphaSpace(value, messages.alphaSpace || `Please enter valid ${field}`);
              break;
            case "numeric":
              error = validators.numeric(value, messages.numeric || `Please enter valid ${field}`);
              break;
            case "email":
              error = validators.email(value, messages.email || `Please enter a valid ${field}`);
              break;
            case "date":
              error = validators.date(value, messages.date || `Please enter a valid ${field}`);
              break;
            case "sameAsField":
              const otherFieldValue = fields[ruleValue];
              error = validators.sameAsField(value, otherFieldValue, messages.sameAsField || `Please ensure ${field} matches ${ruleValue}`);
              break;
            default:
              console.warn(`Unknown validation rule "${rule}" for field "${field}"`);
          }

          if(error){
            if (!isMultiple) {
              newErrors[field] = error;
              return;
            } else {
              multipleMessages.push(error);
            }
          }
        }
      }
      newErrors[field] = isMultiple ? multipleMessages : "";
    });
    if (JSON.stringify(returnAPIs.errors) !== JSON.stringify(newErrors)) {
      const hasErrors = Object.values(newErrors).some((e) => Array.isArray(e) ? e.length > 0 : !!e);
      setReturnAPIs((prev)=> ({...prev, errors: newErrors, isValid: !hasErrors }));
    }
  };

  useEffect(() => {
    const handler = setTimeout(() =>  validate() , debounceDelay);
    return () => clearTimeout(handler);
  }, [fields, validation, debounceDelay]);

  return {...returnAPIs,markTouched, markAllTouched , markUnTouched, markAllUntouched};
};

export default useValidation;
