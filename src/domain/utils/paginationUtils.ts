import { PaginatedQueryProps } from '../interfaces/hooks.interface';

export interface PaginationArgs {
  offset?: number;
  limit?: number;
}

export function getPaginationArgs({
  page,
  itemsPerPage = 16,
}: PaginatedQueryProps): PaginationArgs | undefined {
  if (page === undefined) return undefined;

  return {
    offset: page * itemsPerPage,
    limit: itemsPerPage,
  };
}
