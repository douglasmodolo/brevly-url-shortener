import { api } from "../lib/axios"

export async function deleteShortenedLink(id: string) {
  await api.delete(`/shortened-links/${id}`)
}
