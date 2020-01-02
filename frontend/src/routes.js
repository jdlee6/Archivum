import { Route } from 'react-router-dom';
import React from 'react';
import LookbookListView from './components/pages/LookbookListView';
import Home from './components/pages/Home';
import PictureDetailView from './components/pages/PictureDetailView';

export default function BaseRouter() {
  return (
    <div>
      <Route exact path="/:brand/:season/" component={LookbookListView} />
      <Route exact path="/:brand/:season/:pic" component={PictureDetailView} />
      <Route exact path="/" component={Home} />
    </div>
  );
}
