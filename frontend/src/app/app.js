import { Switch, Route } from 'react-router-dom';
import AuthPage from '../pages/auth-page';
import EventPage from '../pages/event-page';
import './app.scss';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <Route exact path="/events" component={EventPage} />
    </Switch>
  );
}

export default App;
