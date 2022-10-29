import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/SinglePost.css'
import { deletePost, getPostById } from '../API/api';
import EditPost from './EditPost';
import { editPost } from '../API/api';


function SinglePost({ token, userId }) {


    const { postId } = useParams();
    const [currPost, setCurrPost] = useState({});
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        async function getPost() {
            let allPosts = await getPostById(postId);
            console.log(allPosts, 'not in api')
            setCurrPost(allPosts[0])
        }
        getPost()
    }, [postId])

    function updatePost() {
        console.log('teehee')
    }
    console.log(currPost)

    function toggleEdit() {
        setEdit(prevState => !prevState)
    }

    return (
        <div id='singlePostContainer'>
            <div id='post'>
                <h2>{currPost.title}</h2>
                {edit ? <EditPost setEdit={setEdit} token={token} postId={postId} title={currPost.title} price={currPost.price} location={currPost.location} desc={currPost.description} deliver={currPost.willDeliver} update={updatePost} /> : <div id='postInfo'>
                    <p><strong>Description:</strong>{currPost.description}</p>
                    {currPost.author ? <p><strong>Author:</strong> {currPost.author.username}</p> : null}
                    <div><p><strong>Location:</strong> {currPost.location}</p>
                        <p><strong>Created:</strong> {currPost.createdAt}</p></div>

                    {/* <p>Is Author: {currPost.isAuthor ? 'true' : 'false'}</p> */}
                    {/* {currPost.author ? <p>Creator Id: {currPost.author._id}</p> : null} */}
                    {/* <p>Messages: {currPost.messages}</p> */}
                    <p><strong>Price:</strong> {currPost.price}</p>
                    <p><strong>Willing to Deliver?</strong> : {currPost.willDeliver ? 'Yes' : 'No'}</p>
                    {/* <p>_v (?) : {currPost.__v}</p> */}
                </div>}

                <section id='singlePostButtons'>
                    {currPost.author && currPost.author._id === userId ?
                        <button onClick={toggleEdit}><img src='https://img.icons8.com/ios-filled/344/pencil--v2.png'></img>Edit Posting</button>
                        : <button><img src='https://img.icons8.com/windows/344/chat-message.png'></img>Contact Seller</button>}
                </section>
            </div>

        </div>
    )
}

export default SinglePost