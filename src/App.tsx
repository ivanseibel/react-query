import { QueryClientProvider, QueryClient } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import { UserDetailsPage, UsersPage } from './ui/pages';

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
            <Route path="/users" component={UsersPage} />
            <Route path="/user-details" component={UserDetailsPage} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}
