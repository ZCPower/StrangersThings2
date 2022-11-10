import React from 'react'
import '../Styles/Nav.css'
import { Link } from 'react-router-dom'

function Nav({ token }) {
    return (
        <nav id='mainNav' >
            <div id='logo'>
                <h1 className='text-8xl'>Stranger's Things</h1>
                <img src='https://img.icons8.com/cotton/2x/box.png'></img>
            </div>
            <ul>
                <li className='navLink'><Link to='/posts'>Posts</Link></li>

                {token ? <li className='navLink'><Link to='/account'>Account</Link></li> : <li className='navLink'><Link to='/account/login'>Login</Link></li>}
            </ul>
        </nav>
    )
}

export default Nav