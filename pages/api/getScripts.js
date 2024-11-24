import axios from "axios";
export const config = {
    runtime: 'edge', // Enables the Edge Runtime
};

export default async function getScripts(req, res) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    console.log("Getting scripts..", userId, `${process.env.AZURE_FUNC_URL}/api/user/content?user_uid=${userId}`);
    const result = await fetch(`${process.env.AZURE_FUNC_URL}/api/user/content?user_uid=${userId}`);
    if (!result.ok) {
        console.log("Errored...");
        const errorDetails = await result.text();
        throw new Error(`Server error! Status: ${result.status}. Message: ${errorDetails}`);
    } else {
        const data = await result.json();
        console.log("Parsed data...", data);
    }

    return result;
}