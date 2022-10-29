import React, { useState } from 'react'
import { editPost } from '../API/api';
import '../Styles/EditPost.css'

function EditPost({ token, postId, title, price, location, desc, deliver, setEdit, update }) {
    const [newTitle, setNewTitle] = useState(title)
    const [newDesc, setNewDesc] = useState(desc)
    const [newPrice, setNewPrice] = useState(price)
    const [newLocation, setNewLocation] = useState(location)
    const [newDeliver, setNewDeliver] = useState(deliver)


    async function handleEditSubmit(e) {
        e.preventDefault();
        await editPost(token, postId, newTitle, newDesc, newPrice, newLocation, newDeliver)
            .then((result) => {
                if (result.success) {
                    setEdit(prevState => !prevState)
                    update()
                }
                console.log(result)
            })
    }

    function handleTitleChange(e) {
        e.preventDefault();
        console.log(e.target.value)
        setNewTitle(e.target.value)
    }

    function handleDescChange(e) {
        e.preventDefault();
        console.log(e.target.value)
        setNewDesc(e.target.value)
    }

    function handleLocationChange(e) {
        e.preventDefault();
        console.log(e.target.value)
        setNewLocation(e.target.value)
    }

    function handleDeliveryChange(e) {
        // e.preventDefault();
        setNewDeliver(prevState => !prevState)
        console.log(newDeliver)
    }

    function handlePriceChange(e) {
        e.preventDefault();
        setNewPrice(e.target.value);
        console.log(e.target.value)
    }




    return (
        <form id='editForm' onSubmit={handleEditSubmit}>
            <label>Title</label><input onChange={handleTitleChange} defaultValue={title}></input>
            <label>Price</label><input onChange={handlePriceChange} defaultValue={price}></input>
            <label>Location</label><input onChange={handleLocationChange} defaultValue={location}></input>
            <label>Description</label><input onChange={handleDescChange} defaultValue={desc}></input>
            <label>Willing to Deliver?</label><input onChange={handleDeliveryChange} type='checkbox' defaultChecked={deliver} defaultValue={deliver}></input>
            <button>Submit Changes</button>
        </form>
    )
}

export default EditPost