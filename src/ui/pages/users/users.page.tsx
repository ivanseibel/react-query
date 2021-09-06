import React, { ChangeEvent, useCallback, useState } from 'react';
import { useFetchUsers } from '../../../services/data/users.service';
import { FilterOption, SortOption, SortType } from '../../../types/ui.types';

import './styles.css';

import { Filters, Footer, Loading, UsersList } from '../../components';

export const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [appliedFilters, setAppliedFilters] = useState<FilterOption[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>({
    attribute: 'id',
    type: SortType.asc
  });

  const {
    data,
    isLoading,
    isError,
    error
  } = useFetchUsers(page, limit, appliedFilters, sortOption);

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
        <Loading />
      )}

      {isError && error && (
        <p>{error.message}</p>
      )}

      <Filters appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
      <UsersList
        users={data?.users || []}
        setSortOption={setSortOption}
        sortOption={sortOption}
      />
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
