import React from "react";

// Define the data as an object
const commandData = {
    "DATE AND TIME": [
        "what is the time & date",
        "what is the current time and date",
        "what is the date and time",
        "what is the current date and time",
    ],
    DATE: ["what is time", "what is the time", "what is the current time"],
    TIME: ["what is date", "what is the date", "what is the current date"],
    "SEARCH (GOOGLE)": ["Search __", "Search for __"],
    "SEARCH (YOUTUBE)": ["Search for __ on youtube"],
    "OPEN APPS/WEBSITE": ["Open __"],
    "MUSIC ON SPOTIFY": ["Play __"],
};

// Reusable TableRow component
const TableRow = ({ data }: { data: string[] }) => (
    <tr>
        {data.map((command, index) => (
            <td key={index} className="border px-4 py-2">
                {command}
            </td>
        ))}
    </tr>
);

const CommandsTable = () => {
    return (
        <div className="overflow-x-auto ">
            <table className="min-w-full border-collapse">
                <caption className="caption-top mb-2">
                    Table: List of Commands.
                </caption>
                <thead className="overflow-scroll">
                    <tr className="bg-slate-900">
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border" colSpan={4}>
                            Command
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(commandData).map(
                        ([category, commands], index) => (
                            <TableRow
                                key={index}
                                data={[category, ...commands]}
                            />
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CommandsTable;
