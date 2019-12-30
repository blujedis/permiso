import React, { FC } from 'react';
import { Router, Switch } from 'wouter';
import Home from './home';
import Menu from './menu';
import Route from './route';

const NotFound: FC = (props) => {
  return (
    <div>
      404 - Not Found
    </div>
  );
};

const App: FC = () => {

  return (
    <Router>
      <div className="container">
        <div>
          <Menu name="Library Name" />
        </div>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/:404*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );

};

export default App;
