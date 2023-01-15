import React, { useState } from 'react'

export default function ChatInput({
    handleSendMessage
}) {

    const [message, setMessage] = useState('')

    const sendChat = (e) => {
        e.preventDefault()
        if (message.length > 0) {
            handleSendMessage(message)
            setMessage('')
        }
    }

    return (
        <>
            <form
                className='input-container'
                onSubmit={(e) => sendChat(e)}>
                <input
                    type='text'
                    placeholder='send message'
                    className='send-input'
                    onChange={(e) => { setMessage(e.target.value) }}
                    value={message} />
                <button
                    className='send-button'
                    onClick={(e) => sendChat(e)}>
                    Submit
                </button>
            </form>
        </>
    )
}
