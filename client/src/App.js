import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Student from './Student';
import Scst from './Scst'
import Internal from './Internal'

class App extends React.Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <div>
        <Route exact path="/" component={Student} />
        <Route exact path="/internal" component={Internal}/>
        <Route exact path="/scst" component={Scst}/>
      </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
