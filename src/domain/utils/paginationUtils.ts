import { PaginatedQueryProps } from '../interfaces/hooks.interface';

export interface PaginationArgs {
  offset?: number;
  limit?: number;
}

export function getPaginationArgs({page = 1, pageSize}: PaginatedQueryProps): PaginationArgs | undefined {
  if (page < 1) return undefined;

  const page = props.page;
  const itemsPerPage = props.itemsPerPage ?? 16;

  return {
    offset: page * itemsPerPage,
    limit: itemsPerPage,
  };
}
