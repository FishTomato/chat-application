import React from 'react'

export default function Welcome({
    currentUser
}) {
    if (currentUser) {
        return (
            <>
            <div className='welcome-message'>
                Welcome {currentUser.username}
            </div>
            <div className='chat-input-not-selected' />
            </>
        )
    }
}
