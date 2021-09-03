import { useCallback, Fragment, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useFetchUsers } from './services/data/users.service';
import './App.css';
import { FilterOption } from './types/ui.types';


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Router>
        <div id="main">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Users() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  // const [filters, setFilters] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<FilterOption[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('id');
  const [filterInput, setFilterInput] = useState('');

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

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setPage(1);
  }, [])

  const handleFilterInput = useCallback((e) => {
    setFilterInput(e.target.value);
  }, []);

  const handleSelectedFilter = useCallback((e) => {
    setSelectedFilter(e.target.value);
  }, []);

  const handleApplyFilter = useCallback(() => {
    const newFilter = {
      filter: selectedFilter,
      filterValue: filterInput
    };

    setAppliedFilters([...appliedFilters, newFilter]);
    setFilterInput('');
  }, [appliedFilters, filterInput, selectedFilter]);

  const handleCloseFilter = useCallback((index: number) => {
    const newAppliedFilters = appliedFilters;
    newAppliedFilters.splice(index, 1);
    setAppliedFilters([...newAppliedFilters]);
  }, [appliedFilters]);

  return (
    <>
      <h2>Users</h2>
      {isLoading && (
        <span id="loading">⌛</span>
      )}

      {isError && error && (
        <p>{error.message}</p>
      )}

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

      {data?.users && (
        <ul id="user-list-grid">
          <li>
            <strong>id</strong>
            <strong>name</strong>
            <strong>email</strong>
            <strong>website</strong>
          </li>
          {data.users.map(user => (
            <li key={user.email} >
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.website}</span>
            </li>
          ))}
        </ul>
      )}

      <footer>
        <div id="page-buttons">
          <button onClick={handleFirstPage}>
            {`|<`}
          </button>
          <button onClick={handlePreviousPage} >
            {`<`}
          </button>
          <button onClick={handleNextPage}>
            {`>`}
          </button>
          <button onClick={handleLastPage}>
            {`>|`}
          </button>
        </div>
        <div id="limit">
          <label htmlFor="limit">limit:
            <select name="limit" id="limit-items" onChange={handleLimit} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>
        </div>
      </footer>
    </>
  );
}