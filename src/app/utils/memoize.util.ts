/**
 * Memoization utilities for performance optimization
 */

/**
 * Simple memoization decorator for methods with primitive or object inputs
 * Caches the last result based on a shallow comparison of arguments
 */
export function Memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  let cachedArgs: any[] = [];
  let cachedResult: any;
  let hasCache = false;

  descriptor.value = function (...args: any[]) {
    // Check if arguments have changed
    const argsChanged = !hasCache || 
      args.length !== cachedArgs.length ||
      args.some((arg, index) => !shallowEqual(arg, cachedArgs[index]));

    if (argsChanged) {
      cachedArgs = args;
      cachedResult = originalMethod.apply(this, args);
      hasCache = true;
    }

    return cachedResult;
  };

  return descriptor;
}

/**
 * Shallow equality comparison for arrays and objects
 */
function shallowEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  if (obj1 === null || obj2 === null) return false;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => item === obj2[index]);
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => obj1[key] === obj2[key]);
}

/**
 * Cache for computed values with dependency tracking
 */
export class ComputedCache<T> {
  private cache: T | undefined;
  private dependencies: any[] = [];
  private hasCache = false;

  constructor(private computeFn: (...deps: any[]) => T) {}

  get(...currentDeps: any[]): T {
    const depsChanged = !this.hasCache ||
      currentDeps.length !== this.dependencies.length ||
      currentDeps.some((dep, index) => !shallowEqual(dep, this.dependencies[index]));

    if (depsChanged) {
      this.cache = this.computeFn(...currentDeps);
      this.dependencies = currentDeps;
      this.hasCache = true;
    }

    return this.cache!;
  }

  invalidate(): void {
    this.hasCache = false;
    this.cache = undefined;
    this.dependencies = [];
  }
}

/**
 * Create a memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  let lastArgs: any[] = [];
  let lastResult: any;
  let hasCache = false;

  return ((...args: any[]) => {
    const argsChanged = !hasCache ||
      args.length !== lastArgs.length ||
      args.some((arg, index) => !shallowEqual(arg, lastArgs[index]));

    if (argsChanged) {
      lastArgs = args;
      lastResult = fn(...args);
      hasCache = true;
    }

    return lastResult;
  }) as T;
}
