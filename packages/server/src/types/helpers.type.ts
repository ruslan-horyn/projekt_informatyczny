export type FilterKeys<T, K extends keyof T> = Omit<T, K>;
