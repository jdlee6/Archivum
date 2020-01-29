import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Home from './components/pages/Home';
import LookbookListView from './components/pages/LookbookListView';
import PicturesListView from './components/pages/PicturesListView';
import PictureDetailView from './components/pages/PictureDetailView';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import MyProfile from './components/pages/MyProfile';
import UserProfile from './components/pages/UserProfile';
import ProfileUpdate from './components/pages/ProfileUpdate';
import PasswordReset from './components/pages/PasswordReset';
import PasswordChange from './components/pages/PasswordChange';

export default function BaseRouter() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/password/reset" component={PasswordReset} />
        <Route
          exact
          path="/accounts/reset/:uidb64/:token"
          component={PasswordChange}
        />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/:username/profile" component={UserProfile} />
        <PrivateRoute exact path="/profile" component={MyProfile} />
        <PrivateRoute path="/profile/update" component={ProfileUpdate} />
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
