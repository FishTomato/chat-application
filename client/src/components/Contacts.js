import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'

export default function Contacts({
    contacts,
    currentUser,
    currentChat,
    currentSelected,
    changeCurrentChat
}) {


    return (
        <>
            <div className='sidebar'>
                <div className='contact-header'>
                    Contacts
                </div>
                <div className='contact-list'>

                    {currentUser && (
                        contacts.map((contact, index) => {
                            return (
                                <div
                                    className={'contact' + (index === currentSelected ? '-selected' : '')}
                                    onClick={() => changeCurrentChat(index, contact)}
                                    key={index}>
                                    <h3>
                                        {contact.username}
                                    </h3>
                                </div>
                            )
                        })
                    )}
                </div>
                <div className='username-sidebar'>
                    {currentUser && currentUser.username}
                </div>
            </div>
        </>
    )
}
