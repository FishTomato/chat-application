import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import ChatInput from './ChatInput'
import { v4 as uuidv4 } from "uuid";

const KEY = 'chat-app-user';

export default function ChatContainer({
    currentChat,
    socket
}) {

    const [messages, setMessages] = useState([])
    const [receivedMessage, setReceivedMessaged] = useState(null)

    const scrollRef = useRef()

    const handleSendMessage = async (message) => {
        const user = JSON.parse(localStorage.getItem(KEY))
        await axios.post(sendMessageRoute, {
            from: user._id,
            to: currentChat._id,
            message: message
        });
        socket.current.emit("send-message", {
            to: currentChat._id,
            from: user._id,
            message: message
        })

        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: message })
        setMessages(msgs)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem(KEY))
        const getMessages = async () => {
            const response = await axios.post(getAllMessagesRoute, {
                from: user._id,
                to: currentChat._id,
            })
            setMessages(response.data)
        }
        getMessages()
    }, [currentChat])

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(localStorage.getItem(KEY))._id;
            }
        }
        getCurrentChat()
    }, [currentChat])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("message-receieve", (msg) => {
                setReceivedMessaged({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        if (receivedMessage) {
            setMessages(curr => [...curr, receivedMessage])
        }
    }, [receivedMessage])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <>
            <div className='chat-background'>
                <div className='messages-container'>
                    {(messages.map(message => {
                        return (
                            <div ref={scrollRef}
                                key={uuidv4()}>
                                <div
                                    className={message.fromSelf ? 'sent' : 'receieved'}>
                                    <div className='message'>
                                        {message.message}
                                    </div>
                                </div>
                            </div>
                        )
                    }))}
                </div>
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
        </>
    )
}
