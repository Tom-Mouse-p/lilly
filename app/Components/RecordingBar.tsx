"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import CommandsTable from "./CommandsTable";

interface Props {
    mode: any;
    setMode: any;
}
function RecordingBar({ mode, setMode }: Props) {
    const [leftScr, setLeftScr] = useState("/icons/keyboard-regular.svg");
    const [centerScr, setCenterScr] = useState("/mic.png");

    useEffect(() => {
        handleChangeImage();
    }, []);

    const handleChangeImage = () => {
        if (mode == 0) {
            setMode(1);
            setLeftScr("/icons/keyboard-regular.svg");
            setCenterScr("/mic.png");
        } else {
            setMode(0);
            setLeftScr("/mic.png");
            setCenterScr("/icons/keyboard-regular.svg");
        }

        // console.log(leftScr, centerScr, mode);
    };

    function swapInput() {
        handleChangeImage();
    }
    function toggleHelp() {
        const helpBox = document.getElementById("helpBox");
        helpBox?.classList.toggle("displayNone");
    }

    return (
        <div className="fixed bottom-0 w-full h-28 flex items-center justify-center ">
            <div
                id="helpBox"
                className="displayNone z-10 fixed h-screen w-screen bg-slate-800 top-0 left-0 flex items-center gap-40 p-4 my-auto flex-col overflow-auto"
            >
                <div className="flex flex-row-reverse container">
                    <button
                        type="button"
                        className="btn bg-slate-900"
                        onClick={toggleHelp}
                    >
                        Close
                    </button>
                </div>
                <CommandsTable />
            </div>
            <div
                id="bottom_box"
                className=" bg-slate-950 w-full sm:w-3/4 md:w-1/2 md:max-w-2xl h-full flex justify-between items-center rounded-lg px-12 "
            >
                <div id="leftBox" className="flex justify-center items-center">
                    <button type="button" id="swapBtn" onClick={swapInput}>
                        <Image
                            src={leftScr}
                            width={20}
                            height={20}
                            alt=""
                            id="swapImg"
                        />
                    </button>
                </div>

                <div
                    id="toolBox"
                    className="px-4 flex justify-center items-center gap-1 shadow shadow-gray-900 rounded-full"
                >
                    <button
                        type="button"
                        className="w-16 h-16 rounded-full p-4 flex justify-center items-center"
                        id="startButton"
                    >
                        <Image
                            src={centerScr}
                            alt={""}
                            width={64}
                            height={64}
                        />
                    </button>
                </div>

                <div
                    id="rightBox"
                    className="flex justify-center items-center cursor-pointer"
                >
                    <span className="tooltip" data-tip="Help | Command List">
                        <Image
                            src="/icons/help.svg"
                            width={30}
                            height={30}
                            alt=""
                            onClick={toggleHelp}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default RecordingBar;
