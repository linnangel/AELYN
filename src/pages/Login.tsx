import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "user" && password === "1234") {
      login(username);
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/bc/b6/87/bcb68763e308cccb245013793a1046e7.jpg"
          alt="Aelyn"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-12">
          <Link
            to="/"
            className="text-6xl font-semibold italic tracking-wide text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Aelyn
          </Link>
          <p className="mt-4 text-white/70 text-lg text-center">
            Discover the magic of designer collectibles
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8 lg:py-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link
              to="/"
              className="lg:hidden text-4xl font-semibold italic text-black mb-8 block"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Aelyn
            </Link>
            <h1 className="text-3xl font-bold text-black">Welcome back</h1>
            <p className="mt-2 text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E92426] focus:border-transparent focus:bg-white transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E92426] focus:border-transparent focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#E92426] text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#E92426] text-white font-semibold py-3.5 rounded-xl hover:bg-[#B81D1E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E92426] transition-all duration-300"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Continue as{" "}
            <Link
              to="/"
              className="text-black font-medium hover:text-[#E92426] transition-colors"
            >
              Guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
