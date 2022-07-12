import { PaginatedQueryProps } from '../interfaces/hooks.interface';

export interface PaginationArgs {
  offset?: number;
  limit?: number;
}

export function getPaginationArgs(props: Partial<PaginatedQueryProps>): PaginationArgs | undefined {
  if (props.page === undefined) return undefined;

  const page = props.page;
  const itemsPerPage = props.itemsPerPage ?? 16;

  return {
    offset: page * itemsPerPage,
    limit: itemsPerPage,
  };
}
