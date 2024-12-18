export const config = {
    runtime: 'edge', // Enables the Edge Runtime
};

export default async function getScripts(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const apiUrl = `${process.env.AZURE_FUNC_URL}/api/user/content?user_uid=${userId}`;
    // ("Get scripts..", apiUrl);
    const result = await fetch(apiUrl);

    if (!result.ok) {
        const errorDetails = await result.text();
        return new Response(
            JSON.stringify({ error: `Server error! Status: ${result.status}. Message: ${errorDetails}` }),
            {
                status: result.status,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    const data = await result.json();
    ("Data...", data);
    return new Response(
        JSON.stringify({ data }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    );
}
