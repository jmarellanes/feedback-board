import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import FeedbackDetails from './pages/FeedbackDetails';
import DesignSystem from './pages/DesignSystem/DesignSystem';
import Roadmap from './pages/Roadmap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.scss';

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames='fade'>
              <Switch location={location}>
                <Route path='/design-system'>
                  <DesignSystem />
                </Route>
                <Route path='/' exact>
                  <Redirect to='/all' />
                </Route>
                <Route path='/roadmap' exact>
                  <Roadmap />
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
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
}

export default App;
