import { useCallback, Fragment, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useFetchUsers } from './services/data/users.service';
import { Filters, UsersList } from './ui/components/index';
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
  // const [selectedFilter, setSelectedFilter] = useState('id');
  // const [filterInput, setFilterInput] = useState('');

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
