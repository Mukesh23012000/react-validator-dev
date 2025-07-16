export default function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join('|');
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}
//# sourceMappingURL=memomize.js.map