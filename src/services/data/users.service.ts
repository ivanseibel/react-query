import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import { UserResponse } from '../../types/server.data.types';
import { FilterOption, SortOption, SortType } from '../../types/ui.types';

const DEFAULT_STALE_TIME = 10000;
const DEFAULT_HOST = 'http://localhost:3004';

const fetchUsers = async (page: number, limit: number, filters: FilterOption[], sortOption: SortOption) => {
  const params = new URLSearchParams();

  if (filters.length > 0) {
    filters.forEach(filter => {
      params.append(filter.filter, filter.filterValue);
    });
  }

  if (sortOption) {
    const order = sortOption.type === SortType.asc ? 'asc' : 'desc';
    params.append('_sort', sortOption.attribute);
    params.append('_order', order);
  }

  const parsedParams = `&${params.toString()}`;

  const response = await axios.get(`${DEFAULT_HOST}/users?_page=${page}&_limit=${limit}${parsedParams}`);
  const { data } = response;
  const { "x-total-count": totalCount } = response.headers;
  const totalPages = Math.ceil(totalCount / limit);
  return { totalCount, totalPages, users: data };
}

export function useFetchUsers(page: number, limit: number, filters: FilterOption[], sortOption: SortOption) {
  const queryClient = useQueryClient();
  return useQuery<UserResponse, Error>(['users', { page, limit, filters, sortOption }], () => fetchUsers(page, limit, filters, sortOption), {
    cacheTime: DEFAULT_STALE_TIME,
    onSuccess: (response) => {
      response.users.forEach((user) => {
        queryClient.setQueryData(['user', user.id], user);
      });
    }
  });
}
