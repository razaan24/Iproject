import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Toastify from "toastify-js";
import ChatBox from "../Components/chatbox";

export default function BaseLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.access_token) {
      Toastify({
        text: "Please sign-in",
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
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="p-5">
        <Navbar />
        <ChatBox />
        <Outlet />
      </div>
    </>
  );
}
