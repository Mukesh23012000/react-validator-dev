export default function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>();
  
    return function (...args: Parameters<T>): ReturnType<T> {
      const key = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join('|');
  
      if (cache.has(key)) {
        return cache.get(key)!;
      }
  
      const result = fn(...args);
      cache.set(key, result);
      return result;
    } as T;
  }
  