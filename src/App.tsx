import React from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './skeuos/skeuos.css';
import Main from './components/main/Main';
import Signin from './components/signin/Signin';

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }  

  render() {
    return (
      
      <Router>
        <div>
        <Route exact path="/" component={Main}></Route>
        <Route path="/signin" component={Signin}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
