import React, { Dispatch, Fragment, SetStateAction, useCallback, useState } from 'react';

import { FilterOption } from '../../../types/ui.types';

import './styles.css';

interface FiltersProps {
  setAppliedFilters: Dispatch<SetStateAction<FilterOption[]>>;
  appliedFilters: FilterOption[];
}

export const Filters: React.FC<FiltersProps> = ({ appliedFilters, setAppliedFilters }) => {
  const [filterInput, setFilterInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('id');

  const handleFilterInput = useCallback((e) => {
    setFilterInput(e.target.value);
  }, []);

  const handleApplyFilter = useCallback(() => {
    const newFilter = {
      filter: selectedFilter,
      filterValue: filterInput
    };

    setAppliedFilters([...appliedFilters, newFilter]);
    setFilterInput('');
  }, [appliedFilters, filterInput, selectedFilter, setAppliedFilters]);

  const handleSelectedFilter = useCallback((e) => {
    setSelectedFilter(e.target.value);
  }, []);

  const handleCloseFilter = useCallback((index: number) => {
    const newAppliedFilters = appliedFilters;
    newAppliedFilters.splice(index, 1);
    setAppliedFilters([...newAppliedFilters]);
  }, [appliedFilters, setAppliedFilters]);

  return (
    <div id="filters-container">
      <div className="line1">
        <input
          type="text"
          name="filter"
          id="filter"
          value={filterInput}
          onChange={handleFilterInput}
          className="filters-elements"
        />
        <button type="submit" onClick={handleApplyFilter} >Filter</button>
        <select
          name="filters-list"
          id="filters-list"
          onChange={handleSelectedFilter}
          className="filters-elements"
        >
          <option value="id">id</option>
          <option value="name_like">name</option>
          <option value="email">email</option>
          <option value="website">website</option>
        </select>
      </div>
      <div className="line2">
        {appliedFilters.map((item, index) => (
          <Fragment key={index.toString()}>
            <div>
              <span className="filters-badge">{item.filter}={item.filterValue}</span>
              <span className="close-icon" onClick={() => handleCloseFilter(index)}>x</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
