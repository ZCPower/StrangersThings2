import React, { useState, useEffect } from 'react';
import { currentUser } from '../API/api';
import '../Styles/Account.css'



function Account({ token, setToken, currUser, setCurrUser }) {
    // const [currUser, setCurrUser] = useState({})

    // useEffect(() => {
    //     async function getMe() {
    //         let user = await currentUser(token);

    //         // console.log(user)
    //         setCurrUser(user.data)
    //         console.log(currUser, 'CURRUSER')
    //         // console.log(token)
    //     }
    //     getMe()
    // }, [])

    console.log(currUser)

    function logOut() {
        setToken('');
        setCurrUser(null)
        localStorage.clear()
    }


    //HAVE STATE OF USER/USERNAME
    //SET LOCAL STORAGE TO CLEAR
    return (
        <div id='accountContainer'>
            <div id='accountInfo'>
                {currUser ? <h2>{currUser.username}</h2> : null}
                <img src='https://img.icons8.com/windows/344/user.png'></img>
                <div id='accountButtons'>
                    <button id='myMessagesButton'>Messages</button>
                    <button id='myPostButton'>My Posts</button>
                    <button id='logOutButton' onClick={logOut}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Account