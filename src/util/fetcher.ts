import axios from "axios";

export async function fetcher(url: string) {
  if (url === null) {
    return { status: false };
  }
  const response = await axios.get(url);
  return response.data;
}
