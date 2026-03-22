export async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(`/api${url}`, options);
  return response.json();
}