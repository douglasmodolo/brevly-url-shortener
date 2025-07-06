import { api } from "../lib/axios";

interface CreateShortenedLinkData {
    originalLink: string;
    shortenedLink: string;
}

export async function createShortenedLink({
    originalLink,
    shortenedLink,
}: CreateShortenedLinkData) {
    const response = await api.post("/shortened-links", {
        originalLink,
        shortenedLink
    })

    return response.data as { id: string }
}