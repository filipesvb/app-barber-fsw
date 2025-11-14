// lib/get-auth-url.ts
export function getAuthUrl(): string {
  // Em runtime cliente, preferir a origem atual (evita mismatches do Codespace)
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }

  // Fallback server-side: usar variável pública ou a server one
  // Preferir NEXT_PUBLIC_* para coisas que o cliente precisa ver.
  return (
    process.env.NEXT_PUBLIC_AUTH_URL ||
    process.env.CODESPACE_URL ||
    "http://localhost:3000"
  );
}
