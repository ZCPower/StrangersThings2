import React, { useState } from 'react'
// import '../Styles/Register.css'
import { register } from '../API/api';
import { Link } from 'react-router-dom'

function Register({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

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
                    setToken(reg.data.token)
                    //redirect to lgin page
                }
            } else console.log('no matchyo matchy')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id='registerContainer'>
            <h2>Register for an account!</h2>
            <form id='registerForm' onSubmit={handleRegSubmit}>

                <input placeholder='Username' onChange={handleNameChange}></input>
                <input type='password' placeholder='Password' onChange={handlePassChange}></input>
                <input type='password' placeholder='Confirm Password' onChange={handleConfirmPassChange}></input>
                <button>Register</button>
            </form>
            <p>Already have an account? Login <Link to='/account/login'>here!</Link></p>
        </div>
    )
}

export default Register