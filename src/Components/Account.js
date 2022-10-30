import React, { useState, useEffect } from 'react';
import { currentUser } from '../API/api';
import '../Styles/Account.css'



function Account({ token, setToken, currUser, setCurrUser }) {
    const [viewing, setViewing] = useState(null);
    console.log(currUser)

    function logOut() {
        setToken('');
        setCurrUser(null)
        localStorage.clear()
    }

    function viewMessages(e) {
        e.preventDefault();
        setViewing('messages')
    }

    function viewPosts(e) {
        e.preventDefault();
        setViewing('posts')
    }

    let messages = currUser.messages.map((x) => {
        return (
            <div className='message'>
                <h3>{x.content}</h3>
                <p>{x.fromUser.username}</p>
                <p>{x.post.title}</p>
            </div>
        )
    })


    let filteredPosts = currUser.posts.filter((x) => {
        return x.active
    })

    console.log(filteredPosts)


    let posts = filteredPosts.map((x) => {
        return (
            <div className='myPost'>
                <h3>{x.title}</h3>
                <h3>{x.price}</h3>
                <h3>{x.location}</h3>
                <h3>{x.description}</h3>
            </div>
        )
    })

    //HAVE STATE OF USER/USERNAME
    //SET LOCAL STORAGE TO CLEAR
    return (
        <div id='accountContainer'>
            <div id='accountInfo'>
                {currUser ? <h2>{currUser.username}</h2> : null}
                <img src='https://img.icons8.com/windows/344/user.png'></img>
                <div id='accountButtons'>
                    <button id='myMessagesButton' onClick={viewMessages}>Messages</button>
                    <button id='myPostButton' onClick={viewPosts}>My Posts</button>
                    <button id='logOutButton' onClick={logOut}>Logout</button>
                </div>
            </div>
            <div id='accountDisplaying'>
                <div id='myMessages' style={viewing === 'messages' ? null : { display: 'none' }}>{messages}</div>
                <div id='myPosts' style={viewing === 'posts' ? null : { display: 'none' }}>
                    {posts}
                </div>
            </div>
        </div>
    )
}

export default Account