import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import FeedbackDetails from './pages/FeedbackDetails';
import DesignSystem from './pages/DesignSystem/DesignSystem';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/design-system'>
          <DesignSystem />
        </Route>
        <Route exact path={['/', '/:categorySlug']}>
          <Home />
        </Route>
        <Route exact path='/feedback/:id'>
          <FeedbackDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
