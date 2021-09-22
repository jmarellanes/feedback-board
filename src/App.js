import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DesignSystem from './pages/DesignSystem/DesignSystem';
import './App.scss';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <main className='main'>
        <Switch>
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
