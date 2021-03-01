import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";



import "./App.css";
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed'
import UserProfile from "./components/UserProfile";


function App() {
  // eslint-disable-next-line   
  const [{ }, dispatch] = useStateValue();
  const [val, setVal] = useState(false);

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      // console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        // the user just logged in / the user was logged in
        // console.log(authUser.displayName);
        dispatch({
          type: "SET_USER",
          user: authUser.displayName,

        });
        setVal(true);
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setVal(false);
      }
    });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/UserProfile">
            <UserProfile />
          </Route>
          <Route path="/">
            {val ? <Feed /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
