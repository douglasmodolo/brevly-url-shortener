import { api } from "../lib/axios";

export async function redirectToOriginalLink(shortenedUrl: string) {
  const response = await api.get(`/r/${shortenedUrl}`)
  return response.data
}