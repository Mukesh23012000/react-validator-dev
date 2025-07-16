import memoize from "./memomize";
export const validators = {
    isRequired: memoize((data, msg) => (!data ? msg : "")),
    maxLength: memoize((data, max, msg) => (data.length > max ? msg : "")),
    minLength: memoize((data, min, msg) => (data.length < min ? msg : "")),
    excludedCharacters: memoize((data, chars, msg) => chars.some((char) => data.includes(char)) ? msg : ""),
    regex: memoize((data, regex, msg) => (!new RegExp(regex).test(data) ? msg : "")),
    alpha: memoize((data, msg) => (!/^[A-Za-z]+$/.test(data) ? msg : "")),
    alphaDash: memoize((data, msg) => (!/^[A-Za-z]+(-[A-Za-z]+)*$/.test(data) ? msg : "")),
    alphaSpace: memoize((data, msg) => (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(data) ? msg : "")),
    numeric: memoize((data, msg) => (!/^\d+$/.test(data) ? msg : "")),
    email: memoize((data, msg) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data) ? msg : ""),
    date: memoize((data, msg) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const date = new Date(data);
        return !(regex.test(data) && !isNaN(date.getTime())) ? msg : "";
    }),
    sameAsField: memoize((data, other, msg) => (data !== other ? msg : ""))
};
//# sourceMappingURL=validators.js.map