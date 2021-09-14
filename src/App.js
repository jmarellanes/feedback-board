import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DesignSystem from './pages/DesignSystem/DesignSystem';
import './App.scss';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/design-system'>
          <DesignSystem />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
