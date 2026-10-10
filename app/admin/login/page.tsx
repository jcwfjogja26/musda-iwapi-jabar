"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import "./login.css";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!supabase) {
        throw new Error(
          "Konfigurasi Supabase belum tersedia. Periksa Environment Variables di Vercel."
        );
      }

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        throw new Error(loginError.message);
      }

      if (!data.session || !data.user) {
        throw new Error("Login belum menghasilkan sesi yang valid.");
      }

      console.log("Login berhasil. Mengarahkan ke dashboard.");

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-container">
      <div className="admin-login-card">
        <h2>Login Admin Dashboard</h2>
        <p>Silakan masuk untuk mengelola data pendaftaran.</p>

        {error && (
          <div className="admin-login-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="admin-email">Email Admin</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@iwapijabar.or.id"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-button"
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
