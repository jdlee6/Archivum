import { Route } from 'react-router-dom';
import React from 'react';
import Home from './components/pages/Home';
import LookbookListView from './components/pages/LookbookListView';
import PicturesListView from './components/pages/PicturesListView';
import PictureDetailView from './components/pages/PictureDetailView';

export default function BaseRouter() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/:brand" component={LookbookListView} />
      <Route exact path="/:brand/:season/" component={PicturesListView} />
      <Route exact path="/:brand/:season/:pic" component={PictureDetailView} />
    </div>
  );
}
