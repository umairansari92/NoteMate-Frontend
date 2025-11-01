import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        // optionally set user info in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user || {}));
        navigate("/");
      } else {
        setError(res.data?.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-500 to-indigo-600 dark:from-slate-900 dark:to-slate-800">
      
      <div className="flex items-center justify-center p-6">
      <form className="w-full max-w-sm bg-white dark:bg-slate-900/70 p-6 rounded-3xl shadow-2xl border border-slate-700 transition-colors" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Welcome back</h1>

        {error && <div className="mb-3 text-sm text-red-200 bg-red-900/30 p-2 rounded">{error}</div>}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full p-3 mb-3 rounded-lg bg-white/80 placeholder-gray-600 outline-none"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full p-3 mb-3 rounded-lg bg-white/80 placeholder-gray-600 outline-none"
          required
        />

        <button
          disabled={loading}
          type="submit"
          className="mt-2 w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

  <p className="mt-4 text-center text-sm text-gray-700 dark:text-white/80">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-white underline cursor-pointer">
            Sign up
          </span>
        </p>
      </form>
      </div>
    </div>
  );
}
