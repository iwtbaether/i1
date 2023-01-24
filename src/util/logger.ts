// a wrapper for console.log that doesn't log in production
export const log = (...args: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(...args);
  }
};
