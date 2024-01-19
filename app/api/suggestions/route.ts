import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(request: NextApiRequest, response: NextApiResponse ) {
    const url = request.url;
    if (!url) {
        response.status(500).json({ error: 'URL is Undefined' })
        return;
    }
    
    const { searchParams } = new URL(url);
    const term = searchParams.get("term");

    const res = await fetch(
        `https://disney-clone-func.azurewebsites.net/api/getaisuggestions?term=${term}`,
        {
            method: "GET",
            headers: {
                'Cache-Control': 's-maxage=86400',
                'Content-Type': 'application/json', //24 hours
            },
        }
    );

    const message = await res.text();

    response.status(200).json({ message });
}