export const validators = {
    isRequired: (data: any, msg: string) => (!data ? msg : ""),

    maxLength: (data: any, max: number, msg: string) => (data.length > max ? msg : ""),

    minLength: (data: any, min: number, msg: string) => (data.length < min ? msg : ""),

    excludedCharacters: (data: any, chars: string[], msg: string) => chars.some((char) => data.includes(char)) ? msg : "",

    regex: (data: any, regex: string, msg: string) => (!new RegExp(regex).test(data) ? msg : ""),

    alpha: (data: any, msg: string) => (!/^[A-Za-z]+$/.test(data) ? msg : ""),

    alphaDash: (data: string, msg: string) => (!/^[A-Za-z]+(-[A-Za-z]+)*$/.test(data) ? msg : ""),

    alphaSpace: (data: string, msg: string) => (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(data) ? msg : ""),

    numeric: (data: string, msg: string) => (!/^\d+$/.test(data) ? msg : ""),
    
    email: (data: string, msg: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data) ? msg : "",

    date: (data: string, msg: string) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      const date = new Date(data);
      return !(regex.test(data) && !isNaN(date.getTime())) ? msg : "";
    },

    sameAsField: (data: string, other: string, msg: string) => (data !== other ? msg : "")
    
};