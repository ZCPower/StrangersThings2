import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Register from './Components/Register'
import Login from './Components/Login';
import Account from './Components/Account';
import AllPosts from './Components/AllPosts';
import SinglePost from './Components/SinglePost';
function App() {
  const [token, setToken] = useState('');
  return (
    <div className="App">

      <Router>
        <Nav token={token} />
        <Switch>
          <Route exact path='/account/register'>
            <Register setToken={setToken} />
          </Route>
          <Route exact path='/account/login'>
            {!token ? <Login setToken={setToken} token={token} /> : <Redirect to='/posts' />}
          </Route>
          <Route exact path='/account'>
            {token ? <Account token={token} setToken={setToken} /> : <Redirect to='/account/login' />}
          </Route>
          <Route exact path='/posts'>
            <AllPosts token={token} />
          </Route>
          <Route exact path='/posts/:postId'>
            <SinglePost />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
