// components/Chat.js

import React, { useState } from "react";

const Chat = () => {
    const [chats, setChats] = useState([
        { role: "bot", message: "Hello! How can I help you?" },
    ]);
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newChat = { role: "user", message: input };
        setChats([...chats, newChat]);
        // Simulate a bot response (you can replace this with actual API calls)
        setTimeout(() => {
            setChats([
                ...chats,
                { role: "bot", message: "I got your message: " + input },
            ]);
        }, 1000);
        setInput("");
    };

    return (
        <div>
            <div className="chat-container">
                {chats.map((chat, index) => (
                    <div key={index} className={`chat ${chat.role}`}>
                        {chat.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
