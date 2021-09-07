import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../types/server.data.types';
import { SortOption, SortType } from '../../../types/ui.types';

import './styles.css';

interface UsersListProps {
  users: User[];
  sortOption: SortOption;
  setSortOption: Dispatch<SetStateAction<SortOption>>;
}

export const UsersList: React.FC<UsersListProps> = ({ users, sortOption, setSortOption }) => {
  const getAttrName = useCallback((attribute: string) => {
    const parsedAttribute = sortOption.attribute === attribute
      ? `${attribute} ${sortOption.type}`
      : attribute;
    return parsedAttribute;
  }, [sortOption]);

  const handleChangeSort = useCallback((e) => {
    const attributeName = e.target.id.replace('attr-', '');

    if (attributeName === sortOption.attribute) {
      const type = sortOption.type === SortType.asc ? SortType.des : SortType.asc;
      setSortOption({
        attribute: attributeName,
        type
      });
    } else {
      setSortOption({
        attribute: attributeName,
        type: SortType.asc
      });
    }
  }, [setSortOption, sortOption]);

  return (
    (
      <ul id="user-list-grid">
        <li>
          <strong onClick={handleChangeSort} id="attr-id">{getAttrName('id')}</strong>
          <strong onClick={handleChangeSort} id="attr-name">{getAttrName('name')}</strong>
          <strong onClick={handleChangeSort} id="attr-email">{getAttrName('email')}</strong>
          <strong onClick={handleChangeSort} id="attr-website">{getAttrName('website')}</strong>
        </li>
        {users.map(user => (
          <Link to={{ pathname: "/user-details", state: { userId: user.id } }}>
            <li key={user.email} >
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.website}</span>
            </li>
          </Link>
        ))}
      </ul>
    )
  );
}
