import { Switch , Redirect } from 'react-router-dom';
import LoginPage from '../pages/login-page';
import RegisterPage from '../pages/register-page';
import EventPage from '../pages/event-page';
import Navbar from '../components/navbar'
import {PrivateRoute, PublicRoute} from '../hoc'
import {useAuth} from '../hooks'


import './app.scss';

function App() {
  const { authUser, isLoading } = useAuth()
  
  return (
    <>
      <Navbar />
      <Switch>  
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/events" component={EventPage} />
        {
          authUser && <Redirect from="/" to='/events' />
        }
        {
          !authUser && !isLoading && <Redirect from="/" to='/login' />
        }
      </Switch>
    </>
  );
}

export default App;
