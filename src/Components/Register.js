import React, { useState } from 'react'
import { register } from '../API/api';
import { Link, useHistory } from 'react-router-dom'

function Register({ setAlertMessage, alertMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    let history = useHistory();

    function handleNameChange(e) {
        e.preventDefault()
        setUsername(e.target.value)
    }

    function handlePassChange(e) {
        e.preventDefault();
        setPassword(e.target.value)
    }

    function handleConfirmPassChange(e) {
        e.preventDefault();
        setConfPassword(e.target.value)
    }

    async function handleRegSubmit(e) {
        e.preventDefault();
        try {
            if (password === confPassword) {
                let reg = await register(username, password);
                if (reg.success) {
                    history.push('/account/login')
                    setAlertMessage(`Successfully registered user ${username}!`)
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 1600)
                } else {
                    if (reg.error.message) setAlertMessage(reg.error.message);
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 1600)
                }
            } else {
                setAlertMessage('Passwords must match.')
                setTimeout(() => {
                    setAlertMessage('');
                }, 1600)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id='registerContainer'>
            <h2>Register for an account!</h2>
            <form id='registerForm' onSubmit={handleRegSubmit}>

                <input placeholder='Username' onChange={handleNameChange}></input>
                <input type='password' minLength={8} placeholder='Password' onChange={handlePassChange}></input>
                <input type='password' placeholder='Confirm Password' onChange={handleConfirmPassChange}></input>
                <button>Register</button>
            </form>
            <p>Already have an account? Login <Link to='/account/login'>here!</Link></p>
            {alertMessage.length ? <div id='errorAlert'><p>{alertMessage}</p></div> : null}
        </div>
    )
}

export default Register