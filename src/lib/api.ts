// src/lib/api.ts
const API = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(path: string) {
  const token = localStorage.getItem("access_token");

  return fetch(`${API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.status === 401) {
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }
    return res.json();
  });
}
