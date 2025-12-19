import { isDevMode } from '@angular/core';

/**
 * Environment-aware logger that only logs in development mode
 */
export class Logger {
  static log(message: string, ...args: any[]): void {
    if (isDevMode()) {
      console.log(message, ...args);
    }
  }

  static warn(message: string, ...args: any[]): void {
    if (isDevMode()) {
      console.warn(message, ...args);
    }
  }

  static error(message: string, ...args: any[]): void {
    if (isDevMode()) {
      console.error(message, ...args);
    }
  }

  static info(message: string, ...args: any[]): void {
    if (isDevMode()) {
      console.info(message, ...args);
    }
  }
}
