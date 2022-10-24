import React, { useEffect, useState } from 'react'
import { addPost } from '../API/api'
import '../Styles/CreatePost.css'

function CreatePost() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('')//should probably be a number
    const [desc, setDesc] = useState('');
    const [delivery, setDelivery] = useState(false)

    function handleTitle(e) {
        e.preventDefault();
        setTitle(e.target.value)
    }

    function handlePrice(e) {
        e.preventDefault();
        setPrice(e.target.value)
    }

    function handleDesc(e) {
        e.preventDefault();
        setDesc(e.target.value)
    }

    function handleDelivery(e) {
        // e.preventDefault();
        setDelivery(prevState => !prevState)
    }

    return (
        <div id='createPostContainer'>
            <h2>Add a Posting!</h2>
            {delivery ? <p>Delivery</p> : <p>No Delivery</p>}
            <form>
                <input placeholder='Listing Title'></input>
                <input placeholder='Listing Price'></input>
                <input placeholder='Listing Description'></input>
                <input onChange={handleDelivery} type='checkbox'></input>
                <button>Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost