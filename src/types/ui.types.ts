export interface FilterOption {
  filter: string;
  filterValue: string;
}

export enum SortType {
  asc = '⬇️',
  des = '⬆️',
  non = '',
}

export interface SortOption {
  attribute: string;
  type: SortType;
}
