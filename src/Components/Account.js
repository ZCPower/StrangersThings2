import React, { useState, useEffect } from 'react';
import { currentUser } from '../API/api';
import '../Styles/Account.css'



function Account({ token, setToken }) {
    const [currUser, setCurrUser] = useState({})

    useEffect(() => {
        async function getMe() {
            let user = await currentUser(token);
            setCurrUser(user.data)
            console.log(currUser, 'CURRUSER')
            console.log(token)
        }
        getMe()
    }, [])


    function logOut() {
        setToken('');
        setCurrUser(null)
        localStorage.clear()
    }


    //HAVE STATE OF USER/USERNAME
    //SET LOCAL STORAGE TO CLEAR
    return (
        <div id='accountContainer'>
            {currUser ? <h2>{currUser.username}'s account</h2> : null}
            <div id='accountButtons'>
                <button id='myMessagesButton'>Messages</button>
                <button id='myPostButton'>My Posts</button>
                <button id='logOutButton' onClick={logOut}>Logout</button>
            </div>
        </div>
    )
}

export default Account