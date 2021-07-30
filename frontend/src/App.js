import Navbar from "./Navbar";
import Main from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import About from "./About"
import Logout from "./Logout";
import Create from "./Create"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

require('dotenv').config()

function App() {
  const [token,setToken] = useState(null);
  const [user,setUser] = useState(null);
  const [status,setStatus] = useState(false);
  
  const auth = {
    'token':token,
    'user':user,
    'status':status
  };
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t && window.location.href != 'http://localhost:3000/login'){
      window.location.replace('http://localhost:3000/login');
    }
    else{

      const url = 'http://localhost:1337/users/me';
      
      axios.get(url,{headers:{'Authorization':'Bearer '+t}})
      .then(response => {
        setToken(t)
        setUser(response.data)
        setStatus(true)
      })
    }
      
  },[])

  const handleUser = (newToken,newUser,newStatus) => {
    setToken(newToken);
    setUser(newUser);
    setStatus(newStatus);
  };
 
  return (
    
    <Router>
    <div className="App">
      <Navbar auth={auth}/>

      <Switch>
        <Route exact path="/">
          <Main auth={auth}/>
        </Route>
      </Switch>
      
      <Switch>
        <Route path="/login">
          <Login auth={auth} handleUser={handleUser}/>
        </Route>
      </Switch>

      <Switch>
        <Route path="/signup">
          <Signup auth={auth} handleUser={handleUser}/>
        </Route>
      </Switch>

      <Switch>
        <Route path="/about">
          <About/>
        </Route>
      </Switch>
      
      <Switch>
        <Route path="/logout">
          <Logout/>
        </Route>
      </Switch>

      <Switch>
        <Route path="/create">
          <Create auth={auth}/>
        </Route>
      </Switch>



    </div>
    </Router>
  );
}

export default App;
