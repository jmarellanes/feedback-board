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
        <Route exact path='/'>
          <Redirect to='/all' />
        </Route>
        <Route exact path={['/all', '/:categoryParam']}>
          <Home />
        </Route>
        <Route exact path='/feedback/:id'>
          <FeedbackDetails />
        </Route>
        <Route exact path='/design-system'>
          <DesignSystem />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
