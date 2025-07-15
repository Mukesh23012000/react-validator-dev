export const validators = {
    isRequired: (data, msg) => (!data ? msg : ""),
    maxLength: (data, max, msg) => (data.length > max ? msg : ""),
    minLength: (data, min, msg) => (data.length < min ? msg : ""),
    excludedCharacters: (data, chars, msg) => chars.some((char) => data.includes(char)) ? msg : "",
    regex: (data, regex, msg) => (!new RegExp(regex).test(data) ? msg : ""),
    alpha: (data, msg) => (!/^[A-Za-z]+$/.test(data) ? msg : ""),
    alphaDash: (data, msg) => (!/^[A-Za-z]+(-[A-Za-z]+)*$/.test(data) ? msg : ""),
    alphaSpace: (data, msg) => (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(data) ? msg : ""),
    numeric: (data, msg) => (!/^\d+$/.test(data) ? msg : ""),
    email: (data, msg) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data) ? msg : "",
    date: (data, msg) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const date = new Date(data);
        return !(regex.test(data) && !isNaN(date.getTime())) ? msg : "";
    },
    sameAsField: (data, other, msg) => (data !== other ? msg : "")
};
//# sourceMappingURL=validators.js.map