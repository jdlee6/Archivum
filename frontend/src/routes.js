import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateroute';
import Home from './containers/home';
import Login from './containers/login';
import Register from './containers/register';
import MyProfile from './containers/myprofile';
import UserProfile from './containers/userprofile';
import ProfileUpdate from './containers/profileupdate';
import PasswordChange from './containers/passwordchange';
import PasswordReset from './containers/passwordreset';
import LookbookList from './containers/lookbooklist';
import PictureList from './containers/picturelist';
import PictureDetail from './containers/picturedetail';

export default function BaseRouter() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/:username/profile" component={UserProfile} />
        <PrivateRoute exact path="/profile" component={MyProfile} />
        <PrivateRoute exact path="/profile/update" component={ProfileUpdate} />
        <Route
          exact
          path="/password/change/:uidb64/:token"
          component={PasswordChange}
        />
        <Route exact path="/password/reset" component={PasswordReset} />
        <Route exact path="/:brand" component={LookbookList} />
        <Route exact path="/:brand/:season" component={PictureList} />
        <Route exact path="/:brand/:season/:pic" component={PictureDetail} />
      </Switch>
    </div>
  );
}
