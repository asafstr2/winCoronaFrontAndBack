import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"

import Login from "./components/login"
import Signup from "./components/signup"
import User from "./components/user"


//get token from local storge 
let token=localStorage.getItem("token");
function App() {
  return (
<Router>
<div className="container">
<Navbar/>
<br/>
<Route   path="/login" exact component={Login}/>
<Route   path="/signup" exact component={Signup}/>
<Route   path="/user" exact component={()=><User token={token} />}/>

</div>

</Router>
  );
}

export default App;
