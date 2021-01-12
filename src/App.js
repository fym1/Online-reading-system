import React from 'react';
import Bottom from './component/Bottom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Login from './containers/My/Login'
import Register from './containers/My/Register'
function App() {
  return (
    <Router>
      <Bottom/>
    </Router>
  );
}

export default App;

