import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import ImageUploadBox from "./ImageUploadBox";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    age: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.fname || !form.lname || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("fname", form.fname);
      fd.append("lname", form.lname);
      fd.append("email", form.email);
      fd.append("password", form.password);
      fd.append("age", form.age);
      if (file) fd.append("profileImage", file); // backend expects profileImage

      const res = await API.post("/auth/signup", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && (res.data.status === true || res.data.success === true)) {
        // success; redirect to login
        navigate("/login");
      } else {
        setError(res.data?.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-500 to-indigo-600 dark:from-slate-900 dark:to-slate-800">
      <div className="flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-slate-900/70 p-6 rounded-3xl shadow-2xl border border-slate-700 transition-colors"
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Create your account
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-200 bg-red-900/30 p-2 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          <input
            name="fname"
            value={form.fname}
            onChange={handleChange}
            placeholder="First name"
            className="w-full p-3 rounded-lg bg-white/80 placeholder-gray-600 outline-none"
            required
          />
          <input
            name="lname"
            value={form.lname}
            onChange={handleChange}
            placeholder="Last name"
            className="w-full p-3 rounded-lg bg-white/80 placeholder-gray-600 outline-none"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full p-3 rounded-lg bg-white/80 placeholder-gray-600 outline-none"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-lg bg-white/80 placeholder-gray-600 outline-none"
            required
          />

         
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="10"
            max="100"
            className="w-full p-3 rounded-lg bg-white/80 placeholder-gray-600 outline-none"
            required
          />
        </div>

        {/* Upload box at bottom like Saylani */}
        <div className="mt-4">
          <ImageUploadBox preview={preview} onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95 transition"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

  <p className="mt-4 text-center text-sm text-gray-700 dark:text-white/80">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-white underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
      </div>
    </div>
  );
}
