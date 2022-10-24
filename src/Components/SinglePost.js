import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/SinglePost.css'
import { getAllPosts } from '../API/api';

function SinglePost() {
    const { postId } = useParams();
    // console.log(useParams)
    const [postList, setPostList] = useState([]);
    const [currPost, setCurrPost] = useState({});


    useEffect(() => {
        async function getPosts() {
            let allPosts = await getAllPosts();
            setPostList(allPosts.data.posts)
        }
        getPosts()
    }, [])

    // console.log(postId)

    let singPost = postList.filter((x) => {
        if (x._id === postId) return x
    })

    //This isn't working so might need to create a function in the api file that does the filtering within a new getPosts function

    return (
        <div id='singlePostContainer'>
            <h2>lol</h2>
        </div>
    )
}

export default SinglePost