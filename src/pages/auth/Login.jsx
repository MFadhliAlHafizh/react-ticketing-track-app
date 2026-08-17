import { useState } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "../../plugins/axios";
import { useAppContext } from "../../AppContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("login", { email, password });

      const token = response.data.data.token;

      Cookies.set("token", token);

      if (response.data.data.user === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="nama@perusahaan.com"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i data-feather="mail" className="w-4 h-4 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {/* TODO: Add click handler for password toggle */}
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <i data-feather="eye" className="w-4 h-4" id="password-toggle"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Ingat saya
            </label>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Lupa password?
          </a>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span>{loading ? "Loading..." : "Masuk"}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Atau</span>
                </div>
            </div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
                Belum punya akun? {" "} 
                <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-800">
                    Daftar sekarang
                </Link>
            </p>
        </div>
      </form>
    </div>
  );
};
