import React from 'react';
import { User } from '../../../types/server.data.types';

import './styles.css';

interface UsersListProps {
  users: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    (
      <ul id="user-list-grid">
        <li>
          <strong>id</strong>
          <strong>name</strong>
          <strong>email</strong>
          <strong>website</strong>
        </li>
        {users.map(user => (
          <li key={user.email} >
            <span>{user.id}</span>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.website}</span>
          </li>
        ))}
      </ul>
    )
  );
}
