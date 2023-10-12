"use client";
import React, { useEffect } from "react";

const SpeechRecognitionPage: React.FC = () => {
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
                output!.textContent = "Listening...";
            };

            recognition.onresult = (event: any) => {
                const result = event.results[0][0].transcript;
                output1!.textContent = `You said: ${result}`;
            };

            recognition.onend = () => {
                output!.textContent = "Speech recognition stopped.";
            };

            startButton?.addEventListener("click", () => {
                recognition.start();
            });
        } else {
            output!.textContent =
                "Speech recognition is not supported in your browser.";
        }
    }, []);

    return (
        <div>
            <h1>Speech Recognition Example</h1>
            <p>Click the button and start speaking.</p>
            <button id="startButton">Start Speech Recognition</button>
            <p id="output"></p>
            <p id="output1"></p>
        </div>
    );
};

export default SpeechRecognitionPage;
