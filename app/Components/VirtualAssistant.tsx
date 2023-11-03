// pages/index.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
const commandData: Record<string, string[]> = require("./commandData.json");

interface WebsiteData {
    [key: string]: string;
}

interface Props {
    mode: any;
}

const VirtualAssistant = ({ mode }: Props) => {
    const [chats, setChats] = useState([
        { role: "bot", message: "Hello! How can I help you?" },
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef("");

    const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);

    const [output, setOutput] = useState("Click to speak");
    const [output1, setOutput1] = useState("");

    const JSON_DATA_URL = "/websites.json";

    useEffect(() => {
        handleVoiceCommand();
        // console.log("inputRef Changed", inputRef);
    }, [inputRef.current]);

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

            recognition.lang = "en-US";
            recognition.onstart = () => {
                setOutput("Listening...");
            };

            let temp: string = "";

            recognition.onresult = (event: any) => {
                const result = event.results[0][0].transcript.trim();
                // console.log("You said:", result);
                let gg = `You said: ${result}`;
                setOutput1(gg);
                setInput(result);
                let speechCommand = removeLastCharacter(result)
                    .toLowerCase()
                    .trim();
                inputRef.current = speechCommand;
                temp = speechCommand;

                // console.log("Calling processInpCommand", speechCommand);

                handleVoiceCommand();
            };

            recognition.onend = () => {
                setOutput("Stopped");
                if (output) output.textContent = "Speech recognition stopped.";
            };

            startButton?.addEventListener("click", () => {
                if (mode == 1) {
                    recognition.start();
                }
            });
        } else {
            output!.textContent =
                "Speech recognition is not supported in your browser.";
        }
    }, []);

    useEffect(() => {
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
        // console.log("inp ", input);
        setInput(inputRef.current);
        // console.log("inp2 ", input);
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
        // Open Websites
        if (command.startsWith("open ")) {
            const query: string = command.substring(5);
            const url = websiteData?.[query];
            if (url) {
                let resp =
                    "Opening " + capitalizeFirstLetter(query) + "...   " + url;
                botResponseText(resp);
                openTab(url);
            } else {
                botResponseText("Invalid Website or app");
            }
        } else if (websiteData && command in websiteData) {
            const url = websiteData[command];
            let resp = "Opening " + capitalizeFirstLetter(command) + "...";
            botResponseText(resp);
            openTab(url);
        } else if (
            (command.startsWith("search for ") ||
                command.startsWith("search ")) &&
            (command.includes("on youtube") || command.includes("on youtub"))
        ) {
            let query = "";
            let index;
            if (command.includes("on youtub")) {
                index = command.indexOf(" on youtub");
            } else {
                index = command.indexOf(" on youtube");
            }
            if (command.startsWith("search for ")) {
                query = command.substring(11, index);
            } else {
                query = command.substring(7, index);
            }
            const youtubeSearchURL =
                "https://www.youtube.com/results?search_query=";
            botResponseText(input);
            window.open(youtubeSearchURL + encodeURIComponent(query), "_blank");
            // resultDiv.textContent = `Searching for "${query}" on YouTube`;
        } else if (command.startsWith("search ")) {
            let query: string = command.substring(7);
            if (command.startsWith("search for ")) {
                query = command.substring(11);
            }
            // const searchEngine = "https://www.google.com/search?q=";
            botResponseText("Searching  " + query + " on Google");
            performGoogleSearch(query);
            // window.open(searchEngine + query, "_blank");
            // resultDiv.textContent = `Searching for ${query}`;
        } else if (command.startsWith("play ")) {
            const song = command.substring(5);
            const res = "Searching " + song + " on Spotify...";
            botResponseText(res);
            searchSpotify(song);
            // const spotifySearchURI = `spotify:search:${encodeURIComponent(
            //     song
            // )}`;

            // // Attempt to open the Spotify app
            // window.location.href = spotifySearchURI;
            // const spotifySearchURL = `https://open.spotify.com/search/${encodeURIComponent(
            //     song
            // )}`;
            // botResponseText(input);
            // openTab(spotifySearchURL);

            // You can add code here to play music, e.g., using an external API
            // resultDiv.textContent = `Playing ${song}`;
        } // Check if the command matches any of the DATE_AND_TIME_PHRASES
        else if (handleDatetimeCommand("DATE AND TIME", command)) {
            let date = new Date();
            const current_time =
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds();
            const res =
                "Current Date and Time: " +
                date.toLocaleDateString("en-IN") +
                " " +
                current_time;
            botResponseText(res);
        } else if (handleDatetimeCommand("DATE", command)) {
            let date = new Date();
            const res = "Current time is: " + date.toLocaleDateString("en-IN");
            botResponseText(res);
        } else if (handleDatetimeCommand("TIME", command)) {
            let date = new Date();
            var current_time =
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds();
            const res = "Current date is: " + current_time;
            botResponseText(res);
        } else {
            botResponseText("Invalid Command");
        }
    }

    function handleDatetimeCommand(category: string, command: string) {
        if (category in commandData) {
            const categoryPhrases = commandData[category];
            if (categoryPhrases.some((phrase) => command.startsWith(phrase))) {
                return true;
            }
        }
        return false;
    }

    function searchSpotify(songName: string) {
        // Get the user input
        // const songName = document.getElementById('songName').value;

        // Construct the Spotify URI for search
        const spotifySearchURI = `spotify:search:${encodeURIComponent(
            songName
        )}`;

        botResponseText(
            "Playing " + capitalizeFirstLetter(songName) + " on Spotify..."
        );
        // Check if the Spotify app is installed
        if (isSpotifyAppInstalled(spotifySearchURI)) {
            // Open the Spotify app
            window.location.href = spotifySearchURI;
        } else {
            // Redirect to a web-based Spotify search
            let url = `https://open.spotify.com/search/${encodeURIComponent(
                songName
            )}`;
            openTab(url);
        }
    }

    function isSpotifyAppInstalled(spotifySearchURI: any) {
        // You can check if the Spotify URI scheme is supported
        return (window.location.href = spotifySearchURI);
        // if (window.location.href = spotifySearchURI){

        // };
        // return false;
    }

    function performGoogleSearch(searchTerm: string) {
        // Get the user's search term
        // const searchTerm = document.getElementById('searchTerm').value;

        // Construct the Google search URL
        const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(
            searchTerm
        )}`;

        const isAndroid = /Android/i.test(navigator.userAgent);

        if (isAndroid) {
            // Check if the Google app is installed on Android
            const isGoogleAppInstalled = true;

            if (isGoogleAppInstalled) {
                // Open the Google app using a custom URI scheme
                const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(
                    searchTerm
                )}`;

                // Open the URL in the device's default web browser
                // window.open(googleSearchURL, "_blank");
                openTab(googleSearchURL);
            } else {
                // Open the URL in a new tab
                openTab(googleSearchURL);
                // window.open(googleSearchURL, "_blank");
            }
        } else {
            // For non-Android devices, simply open the URL in a new tab
            openTab(googleSearchURL);
            // window.open(googleSearchURL, "_blank");
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
        }, 3000);
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
        if (inputString.endsWith(".")) return inputString.slice(0, -1);

        return inputString;
    }

    function scrollToBottom() {
        var chatbox = document.getElementById("chat-message");
        if (chatbox) chatbox.scrollTop = chatbox.scrollHeight;
    }

    return (
        <div className="flex justify-center h-screen bg-slate-900 overflow-hidden">
            <div className="bg-slate-800 w-full sm:w-3/4 md:w-1/2 md:max-w-2xl ">
                <div>
                    {/* Chat Area */}
                    <div
                        className="p-6 overflow-y-auto h-[calc(100vh-10.5rem)]"
                        id="chat-message"
                    >
                        {chats.map((chat, index) => (
                            <div
                                key={index}
                                className={`chat ${
                                    chat.role === "user"
                                        ? "chat-end"
                                        : "chat-start"
                                }`}
                            >
                                {/* <div
                                key={index}
                                className={`p-2 m-2 rounded-lg ${
                                    chat.role === "user"
                                        ? "bg-slate-500 text-white self-end w-1/2 float-right"
                                        : "bg-slate-900 self-start w-1/2 float-left"
                                }`}
                            > */}
                                <p
                                    className={`chat-bubble ${
                                        chat.role === "user"
                                            ? "bg-slate-700"
                                            : "bg-slate-900"
                                    }`}
                                >
                                    {chat.message}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* The Info Bar above the nav */}
                    {mode === 0 ? (
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center fixed bottom-24 bg-slate-950 w-full sm:w-3/4 md:w-1/2 md:max-w-2xl pt-2 pb-6 px-6"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type a message..."
                                className="input input-bordered w-full bg-slate-700"
                            />
                            <button
                                type="submit"
                                className="btn bg-slate-800 ml-2"
                            >
                                Send
                            </button>
                        </form>
                    ) : (
                        <div className="fixed bottom-24 bg-slate-950 w-full sm:w-3/4 md:w-1/2 md:max-w-2xl pt-2 pb-6 px-6">
                            <div id="output" className="block">
                                <p className="py-2">{output}</p>
                            </div>
                            <div id="output1" className="block">
                                <p className="py-2">{output1}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualAssistant;
