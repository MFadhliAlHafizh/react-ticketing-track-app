import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../plugins/axios";
import Cookies from "js-cookie";
import { handleError } from "../../helpers/errorHelper";
import { useAppContext } from "../../AppContext";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate, error, setError, loading, setLoading } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("register", { name, email, password });

      const token = response.data.data.token;

      Cookies.set("token", token);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Lengkap
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${error?.name ? "border-red-500 ring-red-500" : "border-gray-200"}`}
              placeholder="John Doe"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i data-feather="user" className="w-4 h-4 text-gray-400"></i>
            </div>
            {error?.name && (
              <p className="mt-1 text-xs text-red-500">
                {error.name.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1 relative">
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${error?.email ? "border-red-500 ring-red-500" : "border-gray-200"}`}
              placeholder="nama@perusahaan.com"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i data-feather="mail" className="w-4 h-4 text-gray-400"></i>
            </div>
            {error?.email && (
              <p className="mt-1 text-xs text-red-500">
                {error.email.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${error?.password ? "border-red-500 ring-red-500" : "border-gray-200"}`}
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {/* TODO: Add click handler for password toggle */}
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <i
                  data-feather="eye"
                  className="w-4 h-4"
                  id="password-toggle"
                ></i>
              </button>
            </div>
            {error?.password && (
              <p className="mt-1 text-xs text-red-500">
                {error.password.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          {/* TODO: Add loading state to button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            <span>{loading ? "Loading..." : "Daftar"}</span>
          </button>
        </div>
      </form>

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

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};
