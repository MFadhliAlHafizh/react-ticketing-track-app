import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../plugins/axios";
import Cookies from "js-cookie";
import { handleError } from "../../helpers/errorHelper";
import { useAppContext } from "../../AppContext";
import {
  Activity,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  UserPlus,
} from "lucide-react";

export const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { error, setError, loading, setLoading, setUser } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/register", {
        name,
        email,
        password,
      });

      const token = response.data.data.token;

      Cookies.set("token", token);
      setUser(response.data.data.user);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="w-full">
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Activity className="h-7 w-7 text-white" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Tick<span className="text-blue-600">Track</span>
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Buat akun untuk mulai mengelola tiket
            </p>
          </div>

          {/* Register Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40 sm:p-8">
            {/* Header */}
            <div className="mb-7">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Buat akun baru
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Lengkapi data berikut untuk mendaftar
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nama Lengkap
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <UserRound className="h-4 w-4 text-gray-400" />
                  </div>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={`w-full rounded-xl border bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                      error?.name
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                {error?.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {error.name.join(", ")}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={`w-full rounded-xl border bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                      error?.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                    placeholder="nama@perusahaan.com"
                  />
                </div>

                {error?.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {error.email.join(", ")}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <LockKeyhole className="h-4 w-4 text-gray-400" />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={`w-full rounded-xl border bg-gray-50/50 py-2.5 pl-10 pr-11 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                      error?.password
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 transition-colors hover:text-gray-600 cursor-pointer"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {error?.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {error.password.join(", ")}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Membuat akun...
                  </>
                ) : (
                  "Daftar"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">
                  atau
                </span>
              </div>
            </div>

            {/* Login */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Sudah punya akun?{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Masuk sekarang
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} TickTrack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
