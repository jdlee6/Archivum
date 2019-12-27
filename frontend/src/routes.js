import { Route } from 'react-router-dom';
import React from 'react';
import LookbookListView from './containers/LookbookListView';

export default function BaseRouter() {
  return (
    <div>
      <Route exact path="/:brand/:season" component={LookbookListView} />
    </div>
  );
}
