import { api } from "../lib/axios";

export async function exportShortenedLinks() {
    const response = await api.get('/shortened-links/export')
    return response.data
}
