"use client";

import { useState } from "react";
import RecordingBar from "./Components/RecordingBar";
import VirtualAssistant from "./Components/VirtualAssistant";

export default function Home() {
    const [mode, setMode] = useState(1);

    return (
        <div className="main ">
            <VirtualAssistant mode={mode} />
            <RecordingBar mode={mode} setMode={setMode} />
        </div>
    );
}
