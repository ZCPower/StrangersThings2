import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../API/api';
import '../Styles/AllPosts.css'
import { Link } from 'react-router-dom'
import { deletePost } from '../API/api';

function AllPosts({ token, userId }) {
    const [postList, setPostList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [finalSearch, setFinalSearch] = useState('');

    useEffect(() => {
        async function getPosts() {
            let allPosts = await getAllPosts();
            setPostList(allPosts.data.posts)
        }
        getPosts()
    }, [postList])

    const filtered = postList.filter((x => {
        return x.title.toLowerCase().includes(finalSearch.toLowerCase())
    }))

    function handleSearchChange(e) {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        setFinalSearch(searchInput)
    }


    const mappedPosts = filtered.map((x, key) => {
        return (
            <div className='post'>
                <Link to={`/posts/${x._id}`}><h3>{x.title}</h3></Link>
                <p>{x.price}</p>
                <p>{x.author.username}</p>
                < p > {x.location}</p>
                {x.author._id === userId ? <button onClick={() => {
                    deletePost(token, x._id)

                }}> <img src='https://img.icons8.com/ios-glyphs/512/delete-sign.png' alt='X to symbolize deletion'></img>Delete</button > : null}
            </div >
        )
    })


    return (
        <div id='allPostsContainer'><h2>All Postings</h2>
            <form id='searchForm'><img src='https://img.icons8.com/glyph-neue/2x/search.png' alt='magnifying class for search button'></img><input onChange={handleSearchChange} placeholder="Type what you're looking for..." id='postSearch'></input><button onClick={handleSearchSubmit}>Search</button></form>
            {token ? <Link to='/createpost'><button id='addPostButton'>Add Post</button></Link> : null}
            <div id='postHouse'>
                {mappedPosts.length ? mappedPosts : <h2>There are no posts matching your search!</h2>}</div></div>
    )
}

export default AllPosts