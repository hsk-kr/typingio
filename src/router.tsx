import EntryPage from 'containers/EntryPage';
import GamePage from 'containers/GamePage';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/">
          <EntryPage />
        </Route>
        <Route>
          <div>Not Found Page</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
