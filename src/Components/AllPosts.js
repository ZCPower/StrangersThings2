import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../API/api';
import '../Styles/AllPosts.css'
import { Link } from 'react-router-dom'
import { deletePost } from '../API/api';

function AllPosts({ token, userId }) {
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

    //running this async might make it run faster?

    function handleSearchChange(e) {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    // function delPost(e) {
    //     e.preventDefault();
    //     deletePost(token, x._id)
    // }

    const mappedPosts = postList.map((x, key) => {
        return (
            <div className='post'>
                <Link to={`/posts/${x._id}`}><h3>{x.title}</h3></Link>
                <p>{x.price}</p>
                <p>{x.author.username}</p>
                < p > {x.location}</p>
                {x.author._id === userId ? <button onClick={() => {
                    deletePost(token, x._id)

                }}> Delete</button > : null}
            </div >
        )
    })


    return (
        <div id='allPostsContainer'><h2>All Postings</h2>
            <form id='searchForm'><img src='https://img.icons8.com/glyph-neue/2x/search.png'></img><input placeholder="Type what you're looking for..." id='postSearch'></input><button>Search</button></form>
            {token ? <Link to='/createpost'><button id='addPostButton'>Add Post</button></Link> : null}
            <div id='postHouse'>
                {mappedPosts}</div></div>
    )
}

export default AllPosts