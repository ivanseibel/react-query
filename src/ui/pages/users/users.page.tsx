import React, { ChangeEvent, useCallback, useState } from 'react';
import { useFetchUsers } from '../../../services/data/users.service';
import { FilterOption } from '../../../types/ui.types';

import './styles.css';

import { Filters, Footer, UsersList } from '../../components';

export const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<FilterOption[]>([]);

  const {
    data,
    isLoading,
    isError,
    error
  } = useFetchUsers(page, limit, appliedFilters);

  const handlePreviousPage = useCallback(() => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  }, [page]);

  const handleFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (page === data?.totalPages) {
      return;
    }
    setPage(page + 1);
  }, [data?.totalPages, page]);

  const handleLastPage = useCallback(() => {
    setPage(data?.totalPages || 0);
  }, [data?.totalPages]);

  const handleLimit = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  }, [])

  return (
    <>
      <h2>Users</h2>
      {isLoading && (
        <span id="loading">⌛</span>
      )}

      {isError && error && (
        <p>{error.message}</p>
      )}

      <Filters appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
      <UsersList users={data?.users || []} />
      <Footer
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handleLimit={handleLimit}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        limit={limit}
      />
    </>
  );

}
