import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import { BaseUrl } from "../../Api/BaseUrl";
import Button from "../../Components/Button";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.access_token) {
      Toastify({
        text: "You already logged in",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true, //
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
      navigate("/dashboards");
    }
  }, [navigate]);

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(`${BaseUrl}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboards");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BaseUrl}/login`, {
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("access_token", data.access_token);

      navigate("/dashboards");
      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ffd60a",
          color: "#000000",
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
          color: "#000000",
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
            <p className="text-gray-600">Log in to your account</p>
          </div>
          {/* Social Login Buttons */}
          <div className="mt-6 flex justify-center items-center">
            <GoogleLogin onSuccess={googleLogin} />
          </div>
          {/* Email Login */}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="text-gray-600 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address..."
                className="w-full mt-2 p-2 border rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                autoComplete="current-email"
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
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Continue Button */}
            <Button nameProp="Continue" />
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
