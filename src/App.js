// import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Employee} from './Employee';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Companies info
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/employee' component={Employee}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;