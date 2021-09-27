import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import FeedbackDetails from './pages/FeedbackDetails';
import DesignSystem from './pages/DesignSystem/DesignSystem';
import './App.scss';

function App() {
  return (
    <Router>
      <main className='main'>
        <Switch>
          <Route path='/feedback/:id'>
            <FeedbackDetails />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/design-system'>
            <DesignSystem />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
