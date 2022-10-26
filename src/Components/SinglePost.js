import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/SinglePost.css'
import { deletePost, getPostById } from '../API/api';

function SinglePost({ token, userId }) {
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

    console.log(currPost)



    return (
        <div id='singlePostContainer'>
            <div id='post'>
                <h2>{currPost.title}</h2>
                <div id='postInfo'>
                    <p>{currPost.description}</p>
                    {currPost.author ? <p>Author: {currPost.author.username}</p> : null}
                    <p>Location: {currPost.location}</p>
                    <p>Created: {currPost.createdAt}</p>

                    <p>Is Author: {currPost.isAuthor ? 'true' : 'false'}</p>
                    {currPost.author ? <p>Creator Id: {currPost.author._id}</p> : null}
                    <p>Messages: {currPost.messages}</p>
                    <p>{currPost.price}</p>
                    <p>Will Deliver? : {currPost.willDeliver}</p>
                    <p>_v (?) : {currPost.__v}</p>
                </div>
                <section id='singlePostButtons'>
                    {/* {currPost.author && currPost.author._id === userId ?
                        <button onClick={delPost}>Delete Post</button>
                        : null} */}
                    <button>Edit Post</button>
                    <button>Contact Seller</button>
                </section>
            </div>

        </div>
    )
}

export default SinglePost