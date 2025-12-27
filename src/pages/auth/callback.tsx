// /src/pages/auth/callback.tsx

import { useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AuthCallback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    fetch(`${API_BASE}/auth/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then(res => res.json())
      .then(tokens => {
        localStorage.setItem("access_token", tokens.accessToken);
        localStorage.setItem("refresh_token", tokens.refreshToken);
        window.location.href = "/dashboard";
      })
      .catch(() => {
        window.location.href = "/login?error=auth_failed";
      });
  }, []);

  return <p>Signing you in…</p>;
}
