import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alumni from "./pages/alumni";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Sponsors from "./pages/sponsors";
import Team from "./pages/team";

export class Admin extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path={"/alumni"} component={Alumni} />
            <Route path={"/contact"} component={Contact} />
            <Route path={"/register"} component={Register} />
            <Route path={"/sponsors"} component={Sponsors} />
            <Route path={"/team"} component={Team} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Admin