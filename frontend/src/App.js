import Navbar from "./Navbar";
import Main from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>

      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
      </Switch>
      
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>

      <Switch>
        <Route path="/signup">
          <Signup/>
        </Route>
      </Switch>



    </div>
    </Router>
  );
}

export default App;
