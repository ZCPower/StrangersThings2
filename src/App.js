import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Register from './Components/Register'
import Login from './Components/Login';
import Account from './Components/Account';
import AllPosts from './Components/AllPosts';
import SinglePost from './Components/SinglePost';
import CreatePost from './Components/CreatePost';
import { currentUser } from './API/api';
function App() {
  const [token, setToken] = useState('');

  const [currUser, setCurrUser] = useState({})
  const [userId, setUserId] = useState(null)
  const [alertMessage, setAlertMessage] = useState('');



  useEffect(() => {
    async function getMe() {
      let user = await currentUser(token);
      if (user) {
        setCurrUser(user.data)
        setUserId(user.data._id)
        console.log(currUser, 'CURRUSER')
      }
    }
    getMe()
  }, [token])

  return (
    <div className="App">

      <Router>
        <Nav token={token} />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/account/login' />
          </Route>
          <Route exact path='/account/register'>
            <Register setToken={setToken} setAlertMessage={setAlertMessage} />
          </Route>
          <Route exact path='/account/login'>
            {!token ? <Login setToken={setToken} token={token} alertMessage={alertMessage} /> : <Redirect to='/posts' />}
          </Route>
          <Route exact path='/account'>
            {token ? <Account token={token} setToken={setToken} currUser={currUser} setCurrUser={setCurrUser} /> : <Redirect to='/account/login' />}
          </Route>
          <Route exact path='/posts'>
            <AllPosts token={token} userId={userId} />
          </Route>
          <Route exact path='/posts/:postId'>
            <SinglePost token={token} userId={userId} />
          </Route>
          <Route exact path='/createPost'>
            <CreatePost token={token} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
