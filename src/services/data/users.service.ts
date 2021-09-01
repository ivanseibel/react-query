import axios from 'axios';
import { useQuery } from 'react-query';

import { UserResponse } from '../../types/server.data.types';

const fetchUsers = async (page: number, limit: number) => {
    const response = await axios.get(`http://localhost:3004/users?_page=${page}&_limit=${limit}`);
    const { data } = response;
    const { "x-total-count": totalCount } = response.headers;
    const totalPages = Math.ceil(totalCount / limit);
    return { totalCount, totalPages, users: data };
}

export function useFetchUsers(page: number, limit: number) {
    return useQuery<UserResponse, Error>(['users', { page, limit }], () => fetchUsers(page, limit));
}
