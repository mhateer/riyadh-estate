import { useContext, useEffect, useRef, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from "timeago.js";
import { SocketContext } from '../../context/SocketContext';
import { useInboxMessagesStore } from "../../lib/inboxMessageStore";
function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const messageEndRef = useRef();
    const decrease = useInboxMessagesStore(state => state.decrease);


    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);
    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest("/chats/" + id);
            setChat({ ...res.data, receiver });
            if(!res.data.seenBy.includes(currentUser.id)){
                decrease();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");
        if (!text) return;
        try {
            const res = await apiRequest.post("/messages/" + chat.id, { text });
            setChat(prev => ({ ...prev, messages: [...prev.messages, res.data] }))
            e.target.reset();
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const read = async () => {
            try {
                await apiRequest.put("/chats/read/" + chat.id);
            } catch (err) {
                console.log(err);
            }
        }
        if (chat && socket) {
            socket.on("getMessage", (data) => {
                if (chat.id === data.chatId) {
                    setChat(prev => ({ ...prev, messages: [...prev.messages, data] }));
                    read();
                }
            });
        }
    }, [socket, chat])

    return (
        <div className='chat'>
            <div className="messages">
                <h1>Messages</h1>
                {
                    chats.map((dm) => (
                        <div
                            className="message"
                            key={dm.id}
                            style={{
                                backgroundColor: ((dm.seenBy.includes(currentUser.id)) || (chat?.id === dm.id))
                                    ? "white"
                                    : "lightslategrey",
                            }}
                            onClick={() => handleOpenChat(dm.id, dm.receiver)}
                        >
                            <img
                                src={dm.receiver.avatar || "/noavatar.png"}
                                alt=""
                            />
                            <span>{dm.receiver.username}</span>
                            <p>{dm.lastMessage}</p>
                        </div>
                    ))
                }

            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img
                                src={chat.receiver.avatar || "/noavatar.png"}
                                alt="" />
                            {chat.receiver.username}
                        </div>
                        <span className="close" onClick={() => setChat(null)}>X</span>
                    </div>
                    <div className="center">
                        {chat.messages.map((message) => (
                            <div
                                className="chatMessage"
                                key={message.id}
                                style={{
                                    alignSelf: message.userId === currentUser.id
                                        ? "flex-end"
                                        : "flex-start",
                                    textAlign: message.userId === currentUser.id
                                        ? "right"
                                        : "left",
                                }}
                            >
                                <p>{message.text}</p>
                                <span>{format(message.createdAt)}</span>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>

                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="bottom"
                    >
                        <textarea name="text"></textarea>
                        <button>Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;