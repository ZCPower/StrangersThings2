import React, { useState } from 'react'
import { addPost } from '../API/api'
import '../Styles/CreatePost.css'

function CreatePost({ token }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('')//should probably be a number
    const [desc, setDesc] = useState('');
    const [delivery, setDelivery] = useState(false)
    const [heading, setHeading] = useState('Add a Posting!')

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
        setDelivery(prevState => !prevState)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await addPost(token, title, desc, price, delivery)
            .then(async (result) => {
                if (result.success) {
                    setHeading('Posting Successfully Created!')
                    setTimeout(() => setHeading('Add a Posting!'), '1200')
                } else if (result.error.message === "Post validation failed: title: Path `title` is required., description: Path `description` is required., price: Path `price` is required.") {
                    setHeading('Required field missing!')
                    setTimeout(() => setHeading('Add a Posting!'), '1200')
                } else {
                    setHeading(result.error.name)
                    setTimeout(() => setHeading('Add a Posting!'), '1200')
                }
            })
    }

    return (
        <div id='createPostContainer'>
            <h2>{heading}</h2>
            {delivery ? <p>Delivery</p> : <p>No Delivery</p>}
            <form onSubmit={handleSubmit}>
                <input placeholder='Listing Title' onChange={handleTitle}></input>
                <input placeholder='Listing Price' onChange={handlePrice}></input>
                <input placeholder='Listing Description' onChange={handleDesc}></input>
                <input onChange={handleDelivery} type='checkbox'></input>
                <button>Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost