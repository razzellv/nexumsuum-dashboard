const API_BASE = "https://api.nexumsuum.com"; // or Netlify proxy later

let accessToken = localStorage.getItem("access_token");

export async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });

  if (res.status === 401) {
    throw new Error("Unauthorized – token expired");
  }

  return res.json();
}
