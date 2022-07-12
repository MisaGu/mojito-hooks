import React from 'react';
import {
  BUTTON_STYLE,
  CHECKBOX_LABEL_STYLE,
  CHECKBOX_STYLE,
  CURREN_PAGE_LABEL_STYLE,
  ROOT_STYLE,
} from './Pagination.constants';

export interface PaginationProps {
  page?: number;
  lastPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Pagination: React.FC<PaginationProps> = ({ page, lastPage = 0, setPage }) => {
  return (
    <div style={ROOT_STYLE}>
      <label style={CHECKBOX_LABEL_STYLE}>
        <input
          type="checkbox"
          checked={page !== undefined}
          onChange={() => setPage((p) => (p === undefined ? 0 : undefined))}
          style={CHECKBOX_STYLE}
        />
        📑
      </label>

      <button onClick={() => setPage(0)} disabled={!page} style={BUTTON_STYLE}>
        ⏮️
      </button>

      <button
        onClick={() => setPage((p) => Math.max(0, (p ?? 0) - 1))}
        disabled={!page}
        style={BUTTON_STYLE}
      >
        ◀️
      </button>

      <span style={CURREN_PAGE_LABEL_STYLE}>
        {page || 0}/{lastPage}
      </span>

      <button
        onClick={() => setPage((p) => Math.min(lastPage, (p ?? 0) + 1))}
        disabled={page === undefined || page === lastPage}
        style={BUTTON_STYLE}
      >
        ▶️
      </button>

      <button
        onClick={() => setPage(lastPage)}
        disabled={page === undefined || page === lastPage}
        style={BUTTON_STYLE}
      >
        ⏭️
      </button>
    </div>
  );
};
