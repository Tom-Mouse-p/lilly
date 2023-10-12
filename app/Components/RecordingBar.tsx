"use client";
import Image from "next/image";

import { useEffect, useState } from "react";

function RecordingBar({ mode, setMode }) {
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

        console.log(leftScr, centerScr, mode);
    };

    function swapInput() {
        // console.log(e);
        // const swapImg = document.getElementById("swapImg");
        handleChangeImage();
    }

    function doStuff() {
        if (mode == 1) {
            //
        }
    }

    return (
        <div className="fixed bottom-0 w-full h-28 flex items-center justify-center ">
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
                        // onClick={doStuff}
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

                <div id="rightBox" className="flex justify-center items-center">
                    <Image
                        src="/icons/gear-solid.svg"
                        width={20}
                        height={20}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

// const swapInput = document
//     .getElementById("swapBtn")
//     ?.addEventListener("click", (e) => {
//         console.log(e);
//     });

export default RecordingBar;
