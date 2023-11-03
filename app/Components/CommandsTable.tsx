import React from "react";

// Define the data as an object
const commandData: Record<string, string[]> = require("./commandData.json");

// Now you can use commandData as an object containing your commands

const CommandsList: React.FC = () => {
    return (
        <div className="bg-slate-900 container p-4 rounded-lg">
            <h2 className="mb-4 text-3xl font-semibold border-slate-700 border-b-2 py-4">
                List Of Commands
            </h2>
            {Object.entries(commandData).map(([category, commands], index) => (
                <div key={index} className="mb-4">
                    <h3 className="font-semibold capitalize">
                        {category.toLowerCase()}
                    </h3>

                    {category === "DATE AND TIME" ? (
                        <ul className="list-disc pl-6">
                            {commands.map((command, cmdIndex) =>
                                cmdIndex % 2 === 0 ? (
                                    <li
                                        key={cmdIndex}
                                        className="code capitalize select-all text-slate-400"
                                    >
                                        {command}
                                    </li>
                                ) : null
                            )}
                        </ul>
                    ) : (
                        <ul className="list-disc pl-6">
                            {commands.map((command, cmdIndex) => (
                                <li
                                    key={cmdIndex}
                                    className="code capitalize select-all text-slate-400"
                                >
                                    {command}
                                    {""}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommandsList;
