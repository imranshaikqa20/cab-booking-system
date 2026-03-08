import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "RIDER"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/register", form);

      alert(res.data);

      navigate("/login");

    } catch (error) {

      alert(error.response?.data || "Registration failed!");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

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

        {/* Role Selection */}
        <select
          name="role"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          value={form.role}
        >
          <option value="RIDER">Rider</option>
          <option value="DRIVER">Driver</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;