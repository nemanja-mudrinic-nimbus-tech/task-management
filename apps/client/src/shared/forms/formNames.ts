export type FormNames<T> = {
  [name in keyof T]: name;
};
