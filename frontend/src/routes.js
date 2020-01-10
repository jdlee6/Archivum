import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './components/pages/Home';
import LookbookListView from './components/pages/LookbookListView';
import PicturesListView from './components/pages/PicturesListView';
import PictureDetailView from './components/pages/PictureDetailView';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

export default function BaseRouter() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:brand" component={LookbookListView} />
        <Route exact path="/:brand/:season" component={PicturesListView} />
        <Route
          exact
          path="/:brand/:season/:pic"
          component={PictureDetailView}
        />
      </Switch>
    </div>
  );
}
