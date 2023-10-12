// import Image from "next/image";
"use client";

import { useState } from "react";
import RecordingBar from "./Components/RecordingBar";
import VirtualAssistant from "./Components/VirtualAssistant";
// import Voice from "./Components/voice";

export default function Home() {
    const [mode, setMode] = useState(1);
    // function sendMessage() {
    //     const userInput = document.getElementById("user-input");
    //     const message = userInput.value;
    //     if (message.trim() === "") return;

    //     const chatLog = document.getElementById("chat-log");
    //     const chatMessage = document.createElement("li");
    //     chatMessage.classList.add("chat-message");
    //     chatMessage.textContent = `User: ${message}`;
    //     chatLog.appendChild(chatMessage);

    //     // Simulate a response from the chatbot (you'd replace this with actual chatbot logic)
    //     setTimeout(() => {
    //         const botMessage = document.createElement("li");
    //         botMessage.classList.add("chat-message");
    //         botMessage.textContent = `Chatbot: This is a response from the chatbot.`;
    //         chatLog.appendChild(botMessage);
    //         userInput.value = "";
    //     }, 1000);
    // }
    return (
        <div className="main ">
            {/* <Voice /> */}
            <VirtualAssistant mode={mode} />
            <RecordingBar mode={mode} setMode={setMode} />
        </div>
    );
}
