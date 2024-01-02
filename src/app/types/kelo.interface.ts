export interface NavRoutes {
  path: string;
  label: string;
}

export type Plates = {
  [key: string]: number;
};

export type SelectableItem<T> = {
  label: string;
  value: T;
};
