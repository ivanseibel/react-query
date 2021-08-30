import axios from 'axios';
import { useQuery } from 'react-query';

import { User } from '../../types/server.data.types';

const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3004/users');
    const { data } = response;
    return data;
}

export function useFetchUsers() {
    return useQuery<User[], Error>('users', fetchUsers)
}
