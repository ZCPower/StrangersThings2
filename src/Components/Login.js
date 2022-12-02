import React, { useState } from 'react';
import '../Styles/Login.css'
import { login } from '../API/api';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

function Login({ setToken, alertMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsernameChange(e) {
        e.preventDefault();
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        e.preventDefault();
        setPassword(e.target.value)
    }

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            let loginAttempt = await login(username, password);
            console.log(loginAttempt)
            if (loginAttempt.success) {
                setToken(loginAttempt.data.token);
                <Redirect push to='/posts' />
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div id='loginContainer'>
            <h2>Login!</h2>
            <form id='loginForm' onSubmit={handleLoginSubmit}>
                <input placeholder='Username' onChange={handleUsernameChange}></input>
                <input type='password' placeholder='Password' onChange={handlePasswordChange}></input>
                <button>Login!</button>
            </form>
            <p>Don't have an account? Register <Link to='/account/register'>here!</Link></p>
            {alertMessage.length ? <div id='registerAlert'><p>{alertMessage}</p></div> : null}
        </div>
    )
}

export default Login