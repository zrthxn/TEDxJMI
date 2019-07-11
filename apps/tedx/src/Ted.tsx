import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Alumni from './pages/alumni';
import Contact from './pages/contact';
import Register from './pages/register';
import Sponsors from './pages/sponsors';
import Team from './pages/team';
import Header from './pages/partials/header';
import Footer from './pages/partials/footer';
import NotFound from './pages/404';
import Index from './pages';

export class Ted extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Router>
          <Switch>
            <Route path={'/alumni'} component={Alumni} />
            <Route path={'/contact'} component={Contact} />
            <Route path={'/register'} component={Register} />
            <Route path={'/sponsors'} component={Sponsors} />
            <Route path={'/team'} component={Team} />
            <Route exact path={'/'} component={Index}/>
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer/>
      </div>
    )
  }
}

export default Ted