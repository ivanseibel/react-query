import axios from 'axios';
import { useQuery } from 'react-query';

import { UserResponse } from '../../types/server.data.types';
import { FilterOption } from '../../types/ui.types';

const fetchUsers = async (page: number, limit: number, filters: FilterOption[]) => {
    const params = new URLSearchParams();

    if (filters.length > 0) {
        filters.forEach(filter => {
            params.append(filter.filter, filter.filterValue);
        });
    }

    const parsedParams = filters.length > 0 ? `&${params.toString()}` : '';

    const response = await axios.get(`http://localhost:3004/users?_page=${page}&_limit=${limit}${parsedParams}`);
    const { data } = response;
    const { "x-total-count": totalCount } = response.headers;
    const totalPages = Math.ceil(totalCount / limit);
    return { totalCount, totalPages, users: data };
}

export function useFetchUsers(page: number, limit: number, filters: FilterOption[]) {
    return useQuery<UserResponse, Error>(['users', { page, limit, filters }], () => fetchUsers(page, limit, filters));
}
