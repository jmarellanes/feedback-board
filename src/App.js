import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Route path='/feedback/:id'>
          <FeedbackDetails />
        </Route>
        <Route path='/:categorySlug'>
          <Home />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
