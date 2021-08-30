import { QueryClientProvider, QueryClient } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useFetchUsers } from './services/data/users.service';

import './App.css';
import { useState } from "react";
import { useCallback } from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Router>
        <div className="main">
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

  const {
    data,
    isLoading,
    isError,
    error
  } = useFetchUsers(page, limit);

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
  }, [])

  return (
    <>
      <h2>Users</h2>
      {isLoading && (
        <span>...loading data</span>
      )}

      {isError && error && (
        <span>{error.message}</span>
      )}

      <ul className="user-list-grid">
        {data?.users.map(user => (
          <li>
            <span>{user.id}</span>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.website}</span>
          </li>
        ))}
      </ul>

      <footer>
        <div className="page-buttons">
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
        <div className="limit">
          <label htmlFor="limit">limit:
            <select name="limit" id="limit" onChange={handleLimit} >
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