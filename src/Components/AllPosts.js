import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../API/api';
import '../Styles/AllPosts.css'
import { Link } from 'react-router-dom'

function AllPosts({ token }) {
    const [postList, setPostList] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        async function getPosts() {
            let allPosts = await getAllPosts();
            console.log(allPosts)
            setPostList(allPosts.data.posts)
        }
        getPosts()
    }, [])

    function handleSearchChange(e) {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const mappedPosts = postList.map((x, key) => {
        return (
            <div className='post'>
                <Link to={`/posts/${x._id}`}><h3>{x.title}</h3></Link>
                <p>{x.price}</p>
                <p>{x.author.username}</p>

            </div>
        )
    })


    return (
        <div id='allPostsContainer'><h2>All Postings</h2>
            <form id='searchForm'><input placeholder="Type what you're looking for..." id='postSearch'></input><button>Search</button></form>
            {token ? <button id='addPostButton'>Add Post</button> : null}
            <div id='postHouse'>
                {mappedPosts}</div></div>
    )
}

export default AllPosts