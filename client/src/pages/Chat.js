import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { allUsersRoute, host } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer'
import io from 'socket.io-client'


const KEY = 'chat-app-user';

export default function Chat() {

  const socket = useRef()
  const navigate = useNavigate()

  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(KEY))
    if (!user) {
      navigate("/login")
    } else {
      setCurrentUser(user)
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user",currentUser._id)
      console.log('test')
      getContacts()
    }
  }, [currentUser])


  const changeCurrentChat = (index, contact) => {
    if (index === currentSelected) {
      setCurrentSelected(undefined)
      setCurrentChat(undefined)
    } else {
      setCurrentSelected(index)
      setCurrentChat(contact)
    }
  }

  const getContacts = async () => {
    const contactArray = await axios.get(`${allUsersRoute}/${currentUser._id}`)
    setContacts(contactArray.data)
  }

  return (
    <>
      <div className='chat-window'>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          currentChat={currentChat}
          currentSelected={currentSelected}
          changeCurrentChat={changeCurrentChat} />
        {currentChat === undefined ? 
        (<Welcome currentUser={currentUser} />) : 
          (<ChatContainer 
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />)}
        <div className={currentSelected === undefined ? 'chat-not-selected' : 'chat-header'}>
          {currentSelected !== undefined && currentChat.username}
        </div>
      </div>
    </>
  )
}
