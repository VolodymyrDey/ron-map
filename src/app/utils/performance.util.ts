/**
 * Performance monitoring and profiling utilities
 */

/**
 * Performance decorator to measure method execution time
 * Use in development to identify bottlenecks
 */
export function PerformanceMonitor(label?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const methodLabel = label || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = function (...args: any[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();
      
      const duration = end - start;
      if (duration > 1) { // Only log if execution took more than 1ms
        console.log(`⏱️ ${methodLabel}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    };

    return descriptor;
  };
}

/**
 * Performance tracker for tracking render cycles
 */
export class PerformanceTracker {
  private metrics: Map<string, number[]> = new Map();
  private startTimes: Map<string, number> = new Map();

  start(label: string): void {
    this.startTimes.set(label, performance.now());
  }

  end(label: string): void {
    const startTime = this.startTimes.get(label);
    if (!startTime) return;

    const duration = performance.now() - startTime;
    
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    
    this.metrics.get(label)!.push(duration);
    this.startTimes.delete(label);
  }

  getStats(label: string): { min: number; max: number; avg: number; count: number } | null {
    const values = this.metrics.get(label);
    if (!values || values.length === 0) return null;

    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      count: values.length
    };
  }

  report(): void {
    console.group('📊 Performance Report');
    for (const [label, _] of this.metrics) {
      const stats = this.getStats(label);
      if (stats) {
        console.log(
          `${label}: avg=${stats.avg.toFixed(2)}ms, min=${stats.min.toFixed(2)}ms, max=${stats.max.toFixed(2)}ms, count=${stats.count}`
        );
      }
    }
    console.groupEnd();
  }

  reset(label?: string): void {
    if (label) {
      this.metrics.delete(label);
      this.startTimes.delete(label);
    } else {
      this.metrics.clear();
      this.startTimes.clear();
    }
  }
}

/**
 * Global performance tracker instance
 */
export const performanceTracker = new PerformanceTracker();

/**
 * Debounce function for limiting function execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for limiting function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame wrapper for smooth animations
 */
export function rafThrottle<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return function (...args: Parameters<T>) {
    if (rafId !== null) return;
    
    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
}
