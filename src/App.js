import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
