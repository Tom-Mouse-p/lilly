// // pages/api/convert-text-to-url.ts

// import { NextApiRequest, NextApiResponse } from "next";

// export default (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "POST") {
//         const { text } = req.body;

//         if (!text) {
//             return res.status(400).json({ error: "Text is required" });
//         }

//         // Your logic to convert text to a URL here
//         const url = textToURL(text);

//         if (!url) {
//             return res.status(400).json({ error: "Invalid input" });
//         }

//         res.status(200).json({ url });
//     } else {
//         res.status(405).end(); // Method Not Allowed
//     }
// };

// function textToURL(text: string): string | null {
//     // Implement your logic to convert text to a URL
//     // For example, a simple mapping of text to URLs
//     const urlMap: { [key: string]: string } = {
//         "Open Google": "https://www.google.com",
//         "Open YouTube": "https://www.youtube.com",
//         // Add more mappings here
//     };

//     return urlMap[text] || null;
// }
