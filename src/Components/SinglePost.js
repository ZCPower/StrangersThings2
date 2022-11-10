import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/SinglePost.css'
import { deletePost, getPostById } from '../API/api';
import EditPost from './EditPost';
import { editPost } from '../API/api';
import MessageForm from './MessageForm';


function SinglePost({ token, userId }) {


    const { postId } = useParams();
    const [currPost, setCurrPost] = useState({});
    const [edit, setEdit] = useState(false)
    const [messaging, setMessaging] = useState(false)

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

    function toggleMessage() {
        setMessaging(prevState => !prevState)
    }

    return (
        <div id='singlePostContainer'>
            <div id='post'>
                <h2>{currPost.title}</h2>
                {edit ? <EditPost setEdit={setEdit} token={token} postId={postId} title={currPost.title} price={currPost.price} location={currPost.location} desc={currPost.description} deliver={currPost.willDeliver} update={updatePost} /> : <div style={messaging ? { display: 'none' } : null} id='postInfo'>
                    <p><strong>Description:</strong>{currPost.description}</p>
                    {currPost.author ? <p><strong>Author:</strong> {currPost.author.username}</p> : null}
                    <div><p><strong>Location:</strong> {currPost.location}</p>
                        <p><strong>Created:</strong> {currPost.createdAt}</p></div>
                    <p><strong>Price:</strong> {currPost.price}</p>
                    <p><strong>Willing to Deliver?</strong> {currPost.willDeliver ? 'Yes' : 'No'}</p>
                    {/* <p>_v (?) : {currPost.__v}</p> */}
                </div>}
                {messaging ? <MessageForm seller={currPost.author.username} postId={postId} token={token} /> : null}

                <section id='singlePostButtons'>
                    {currPost.author && currPost.author._id === userId ?
                        <button onClick={toggleEdit}><img
                            src='https://img.icons8.com/ios-filled/344/pencil--v2.png'></img>Edit Posting</button>
                        : <button onClick={toggleMessage}
                            className={messaging ? 'red' : null} >

                            <img src={!messaging ? 'https://img.icons8.com/windows/344/chat-message.png' : 'https://img.icons8.com/ios-glyphs/512/delete-sign.png'}>


                            </img>{!messaging ? 'Contact Seller' : 'Cancel Message'}</button>}
                </section>

            </div>

        </div>
    )
}

export default SinglePost