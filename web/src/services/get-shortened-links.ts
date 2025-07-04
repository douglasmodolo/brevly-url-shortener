import { api } from "../lib/axios";

export type ShortenedLink = {
    id: string;
    shortenedLink: string;
    originalLink: string;
    accessCount: number
    createdAt: string
}

export async function getShortenedLinks(): Promise<ShortenedLink[]> {
    const response = await api.get('/shortened-links')

    return response.data
}