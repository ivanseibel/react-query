import { QueryClientProvider, QueryClient } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useFetchUsers } from './services/data/users';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Router>
        <div>
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
  const {
    data: users,
    isLoading,
    isError,
    error
  } = useFetchUsers();

  return (
    <div>
      <h2>Users</h2>
      {isLoading && (
        <span>...loading data</span>
      )}

      {isError && error && (
        <span>{error.message}</span>
      )}

      {typeof users === 'object' && (
        users.map(user => (
          <div>
            <span>{user.id}</span>
          </div>
        ))
      )}
    </div>
  );
}