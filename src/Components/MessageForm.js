import React, { useState } from 'react'
import { sendMessage } from '../API/api'
import '../Styles/MessageForm.css'

function MessageForm({ seller, token, postId }) {
    const [content, setContent] = useState('');

    function handleMessageContent(e) {
        e.preventDefault();
        setContent(e.target.value);
    }

    async function submitMessage(e) {
        e.preventDefault()
        await sendMessage(token, postId, content)
            .then((result) => {
                console.log(result)
            })
    }


    return (
        <div id='messageForm'>
            <h3>To: {seller}</h3>
            <form onSubmit={submitMessage}>
                <textarea onChange={handleMessageContent}></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default MessageForm