"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Identifiants invalides");
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-terra-green/10 p-4">
            <Lock className="h-8 w-8 text-terra-green" />
          </div>
        </div>
        
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Accès Administrateur</h1>
        <p className="mb-6 text-center text-sm text-gray-600">Veuillez vous connecter avec vos identifiants</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail className="h-4 w-4" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Lock className="h-4 w-4" />
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full" isLoading={loading}>
            Se connecter
          </Button>

          <p className="mt-6 text-center text-xs text-gray-500">
            En développement : admin@afrique-espoir.org / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
