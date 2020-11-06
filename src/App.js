import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/navbar'
import Home from './components/home'
import Visualiser from './components/visualiser'
import Finder  from './components/finder'
import Covid from './components/covid'
import Game from './components/game'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Home} />
          <Route exact path="/visualiser" component={Visualiser} />
          <Route exact path="/path_finder" component={Finder} />
          <Route exact path="/covid_simulation" component={Covid} />
          <Route exact path="/game_coloring" component={Game} />
        </div>
      </Router>
    )
  }
}
export default App;
