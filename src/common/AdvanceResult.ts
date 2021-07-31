export interface AdvanceResult<T> {
  data: T | T[];
  meta?: { count: number };
}
