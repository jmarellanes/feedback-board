import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import FeedbackDetails from './pages/FeedbackDetails';
import DesignSystem from './pages/DesignSystem/DesignSystem';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/design-system'>
          <DesignSystem />
        </Route>
        <Route path='/' exact>
          <Redirect to='/all' />
        </Route>
        <Route path='/:categoryParam' exact>
          <Home />
        </Route>
        <Route path='/feedback/:id'>
          <FeedbackDetails />
        </Route>
        <Route path='*'>
          <Redirect to='/all' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
