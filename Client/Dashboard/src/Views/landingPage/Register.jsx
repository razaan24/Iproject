import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import { BaseUrl } from "../../Api/BaseUrl";
import Button from "../../Components/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e, username, email, password) {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const { data } = await axios.post(`${BaseUrl}/register`, body);

      console.log(data);
      navigate("/login");
      Toastify({
        text: "Registration Successfull",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ffd60a",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 flex items-center">
        <div className="flex items-center ">
          <img
            src="https://ik.imagekit.io/3a0xukows/letter-z.png?updatedAt=1735887963196"
            alt="Logo"
            className="h-7"
          />
          <select className="text-gray-600 text-sm bg-transparent focus:outline-none">
            <option>English</option>
          </select>
        </div>
      </nav>
      {/* Login Section */}
      <div className="flex items-center justify-center h-screen -mt-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Think it. Make it.</h1>
            <p className="text-gray-600">Create an account</p>
          </div>
          {/* Email Login */}
          <form onSubmit={(e) => handleSubmit(e, username, email, password)}>
            <div className="mb-6">
              <label htmlFor="username" className="text-gray-600 text-sm">
                Username
              </label>
              <input
                type="username"
                id="username"
                placeholder="Enter your username..."
                className="w-full mt-2 p-2 border rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email" className="text-gray-600 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address..."
                className="w-full mt-2 p-2 border rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="text-gray-600 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password account..."
                className="w-full mt-2 p-2 border rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Continue Button */}
            <Button nameProp="Submit" />
            {/* Footer */}
            <a href="/" className="flex justify-center mt-4">
              Back
            </a>
          </form>
        </div>
      </div>
    </>
  );
}
