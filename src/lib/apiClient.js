// src/lib/apiClient.js
const API_BASE = "https://api.nexumsuum.com"; // your unified gateway

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  });

  const data = await res.json();

  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("expires_at", Date.now() + data.expiresIn * 1000);

  return data.accessToken;
}

async function getValidAccessToken() {
  const expiresAt = Number(localStorage.getItem("expires_at"));
  let token = localStorage.getItem("access_token");

  if (!token || Date.now() > expiresAt) {
    token = await refreshAccessToken();
  }

  return token;
}

export async function apiFetch(path, options = {}) {
  const token = await getValidAccessToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}
