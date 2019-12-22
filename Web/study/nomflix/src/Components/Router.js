import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Header from "Components/Header";
import Video from "Routes/Video";

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" component={TV} />
      <Route path="/search" component={Search} />
      <Route path="/movie/:id/video/:videoId" component={Video} />
      <Route path="/movie/:id/video" component={Video} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/show/:id/video/:videoId" component={Video} />
      <Route path="/show/:id/video" component={Video} />
      <Route path="/show/:id" component={Detail} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
