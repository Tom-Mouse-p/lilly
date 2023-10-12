// pages/index.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

// import Chat from "./Chat";

interface WebsiteData {
    [key: string]: string; // Define an index signature for WebsiteData
}

const VirtualAssistant = ({ mode }) => {
    const [chats, setChats] = useState([
        { role: "bot", message: "Hello! How can I help you?" },
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef("");

    const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
    // const [voiceStopped, setVoiceStopped] = useState(true);

    const [output, setOutput] = useState("Click to speak");
    const [output1, setOutput1] = useState("");

    const JSON_DATA_URL = "/websites.json";

    // useEffect(() => {
    //     processInpCommand();
    //     console.log("ghjk");
    // }, [voiceStopped]);

    useEffect(() => {
        const startButton = document.getElementById("startButton");
        const output = document.getElementById("output");
        const output1 = document.getElementById("output1");

        if (
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window
        ) {
            const SpeechRecognition =
                (window as any).SpeechRecognition ||
                (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = "en-US"; // Set the language for speech recognition

            recognition.onstart = () => {
                setOutput("Listening...");
                // output.textContent = "Listening...";
                console.log("listening");
            };

            // let temp: string;

            recognition.onresult = (event: any) => {
                const result = event.results[0][0].transcript.trim();
                console.log("You said:", result);
                let gg = `You said: ${result}`;
                setOutput1(gg);
                let speechCommand = removeLastCharacter(result)
                    .toLowerCase()
                    .trim();
                inputRef.current = speechCommand;

                // setInput(speechCommand); // Update the input state directly
                console.log("Calling processInpCommand", speechCommand);

                handleVoiceCommand();
                // Now, call processInpCommand directly
                // processInpCommand();
            };

            recognition.onend = () => {
                setOutput("Stopped");
                // output.textContent = "Speech recognition stopped.";
                console.log("stopped");

                // setInput(temp);
                // processInpCommand();
                console.log("Calling processInpCommand");
                // setVoiceStopped(!voiceStopped);
            };

            startButton?.addEventListener("click", () => {
                if (mode == 1) {
                    console.log(1);
                    recognition.start();
                }
            });
        } else {
            output!.textContent =
                "Speech recognition is not supported in your browser.";
        }
    }, []);

    useEffect(() => {
        // Load the JSON data from the external file
        fetch(JSON_DATA_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load JSON data.");
                }
                return response.json();
            })
            .then((data: WebsiteData) => {
                setWebsiteData(data);
            })
            .catch((error) => {
                console.error("Error loading JSON:", error);
            });
    }, []);

    const handleInputChange = (e: any) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        processInpCommand();
    };

    function handleVoiceCommand() {
        console.log("inp", input);
        setInput(inputRef.current);
        processInpCommand();
    }

    function processInpCommand() {
        if (input.trim() != "") {
            const newChat = { role: "user", message: input.trim() };
            setChats([...chats, newChat]);
            // Simulate a bot response (you can replace this with actual API calls)

            processCommand(input.trim());

            setInput("");
        }
    }

    function processCommand(command: string) {
        command = command.toLowerCase();
        if (command.startsWith("open ")) {
            const query: string = command.substring(5);
            const url = websiteData[query];
            let resp = "Opening " + capitalizeFirstLetter(query) + "...";
            botResponseText(resp);
            openTab(url);
        } else if (websiteData && command in websiteData) {
            const url = websiteData[command];
            // const query =
            let resp = "Opening " + capitalizeFirstLetter(command) + "...";
            botResponseText(resp);
            openTab(url);
            // resultDiv.textContent = `Opening ${command}`;
        } else if (
            command.startsWith("search for ") &&
            command.includes("on youtube")
        ) {
            const query = command.substring(11, command.indexOf(" on youtube"));
            const youtubeSearchURL =
                "https://www.youtube.com/results?search_query=";
            window.open(youtubeSearchURL + encodeURIComponent(query), "_blank");
            botResponseText(input);
            // resultDiv.textContent = `Searching for "${query}" on YouTube`;
        } else if (command.startsWith("search for ")) {
            const query = command.substring(11);
            const searchEngine = "https://www.google.com/search?q=";
            window.open(searchEngine + query, "_blank");
            botResponseText(input);
            // resultDiv.textContent = `Searching for ${query}`;
        } else if (command.startsWith("play ")) {
            const song = command.substring(5);
            const spotifySearchURL = `https://open.spotify.com/search/${encodeURIComponent(
                song
            )}`;
            botResponseText(input);
            openTab(spotifySearchURL);

            // You can add code here to play music, e.g., using an external API
            // resultDiv.textContent = `Playing ${song}`;
        } else {
            botResponseText("Invalid Command");
            // resultDiv.textContent = "Invalid command";
        }
    }

    function botResponseText(message: string) {
        setTimeout(() => {
            const botResponse = {
                role: "bot",
                message: message,
            };
            setChats((prevChats) => [...prevChats, botResponse]);

            // window.open("#scrollbottom");
            // scrollToBottom();
        }, 1000);

        setTimeout(() => {
            scrollToBottom();
        }, 2000);
    }

    function openTab(url: string) {
        setTimeout(() => {
            window.open(url, "_blank");
        }, 4000);
    }

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function removeLastCharacter(inputString: string) {
        // Check if the input string is empty or null
        if (inputString == null || inputString.length === 0) {
            return inputString;
        }

        // Use the slice method to remove the last character
        return inputString.slice(0, -1);
    }

    function scrollToBottom() {
        var chatbox = document.getElementById("chat-message");
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    return (
        <div className="flex justify-center h-screen bg-slate-900 overflow-hidden">
            <div className="bg-slate-800 w-full sm:w-3/4 md:w-1/2 md:max-w-2xl ">
                <div>
                    <div
                        className="p-6 pb-0 overflow-y-auto h-[calc(100vh-10.5rem)]"
                        id="chat-message"
                    >
                        {chats.map((chat, index) => (
                            <div
                                key={index}
                                className={`p-2 m-2 rounded-lg ${
                                    chat.role === "user"
                                        ? "bg-slate-500 text-white self-end w-1/2 float-right"
                                        : "bg-slate-900 self-start w-1/2 float-left"
                                }`}
                            >
                                {chat.message}
                            </div>
                        ))}
                    </div>

                    {mode === 0 ? (
                        // <div className="flex justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center fixed bottom-24 bg-slate-950 w-full sm:w-3/4 md:w-1/2 md:max-w-2xl pt-2 pb-6 px-6"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type a message..."
                                className="p-2 w-full h-10"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-lg ml-2"
                            >
                                Send
                            </button>
                        </form>
                    ) : (
                        // </div>
                        <div className="fixed bottom-24 bg-slate-950 w-full sm:w-3/4 md:w-1/2 md:max-w-2xl pt-2 pb-6 px-6">
                            {/* <p>hh</p> */}
                            <div id="output" className="block">
                                {output}
                            </div>
                            <div id="output1" className="block">
                                {output1}
                            </div>
                            {/* <p>hh</p> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualAssistant;
