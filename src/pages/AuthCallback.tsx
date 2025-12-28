import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.error("No auth code returned");
      navigate("/");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("id_token", data.idToken);
        navigate("/dashboard");
      })
      .catch(err => {
        console.error("Token exchange failed", err);
        navigate("/");
      });
  }, []);

  return <p>Signing you in…</p>;
}
