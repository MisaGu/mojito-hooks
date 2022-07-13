import { PaginatedQueryProps } from '../interfaces/hooks.interface';

export interface PaginationArgs {
  offset?: number;
  limit?: number;
}

export function getPaginationArgs({
  page,
  itemsPerPage = 16,
}: PaginatedQueryProps): PaginationArgs | undefined {
  console.log('getPaginationArgs', page);

  if (!page) return undefined;

  return {
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
  };
}
