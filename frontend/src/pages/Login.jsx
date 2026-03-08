import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      // Handle both string token & JSON token response
      const token =
        typeof res.data === "string"
          ? res.data
          : res.data.token;

      if (!token) {
        throw new Error("Token not received");
      }

      // Save token
      localStorage.setItem("token", token);

      // 🔥 Decode role
      const decoded = jwtDecode(token);
      const role = decoded?.role;

      alert("Login Successful!");

      // 🔥 Redirect based on role
      if (role === "DRIVER") {
        navigate("/driver-dashboard");
      } else if (role === "RIDER") {
        navigate("/rider-dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;