import memoize from "./memomize"

export const validators = {
    isRequired: memoize ((data: any, msg: string) => (!data ? msg : "")),

    maxLength: memoize((data: any, max: number, msg: string) => (data?.length > max ? msg : "")),

    minLength: memoize((data: any, min: number, msg: string) => (data?.length < min ? msg : "")),

    excludedCharacters: memoize((data: any, chars: string[], msg: string) => chars.some((char) => data.includes(char)) ? msg : ""),

    regex: memoize((data: any, regex: string, msg: string) => (!new RegExp(regex).test(data) ? msg : "")),

    alpha: memoize((data: any, msg: string) => (!/^[A-Za-z]+$/.test(data) ? msg : "")),

    alphaDash: memoize((data: string, msg: string) => (!/^[A-Za-z]+(-[A-Za-z]+)*$/.test(data) ? msg : "")),

    alphaSpace: memoize((data: string, msg: string) => (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(data) ? msg : "")),

    numeric: memoize((data: string, msg: string) => (!/^\d+$/.test(data) ? msg : "")),
    
    email: memoize((data: string, msg: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data) ? msg : ""),

    date: memoize((data: string, msg: string) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      const date = new Date(data);
      return !(regex.test(data) && !isNaN(date.getTime())) ? msg : "";
    }),
    sameAsField: memoize((data: string, other: string, msg: string) => (data !== other ? msg : ""))
};