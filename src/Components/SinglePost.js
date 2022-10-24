import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/SinglePost.css'
import { getPostById } from '../API/api';

function SinglePost() {
    const { postId } = useParams();
    const [currPost, setCurrPost] = useState({});


    useEffect(() => {
        async function getPost() {
            let allPosts = await getPostById(postId);
            console.log(allPosts, 'not in api')
            setCurrPost(allPosts[0])
        }
        getPost()
    }, [postId])

    return (
        <div id='singlePostContainer'>
            <div id='post'>
                <h2>{currPost.title}</h2>
                <p>{currPost.description}</p>
                <p>Author: {currPost.author.username}</p>
                <p>Location: {currPost.location}</p>
                <p>Created: {currPost.createdAt}</p>
                <button>Contact Seller</button>
                <p>Is Author: {currPost.isAuthor ? 'true' : 'false'}</p>
                <p>Creator Id: {currPost.author._id}</p>
                <p>Messages: {currPost.messages}</p>
                <p>{currPost.price}</p>
                <p>Will Deliver? : {currPost.willDeliver}</p>
                <p>_v (?) : {currPost.__v}</p>
            </div>

        </div>
    )
}

export default SinglePost