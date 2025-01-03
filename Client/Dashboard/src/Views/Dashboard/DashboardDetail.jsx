import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BaseUrl } from "../../Api/BaseUrl";
import axios from "axios";
import Toastify from "toastify-js";

export default function DashboardDetail() {
  const navigate = useNavigate();
  const [dashboards, setDashboard] = useState({});
  const { id } = useParams();

  async function fetchDashboard() {
    try {
      const { data } = await axios.get(`${BaseUrl}/dashboards/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      console.log(data);

      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${BaseUrl}/dashboards/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      fetchDashboard();
      Toastify({
        text: data.message,
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
      s;
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

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      {/* Content */}
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="flex items-center space-x-6">
          <div className="bg-gray-100 p-6 rounded-lg">
            <img src={dashboards.icon} alt="Icon" className="h-16" />
            {/* Replace with your icon */}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">{dashboards.name}</h1>
            <p className="text-gray-600 mt-2">{dashboards.caption}</p>
            <p className="text-black text-xl font-semibold mt-4">
              {dashboards.status}
            </p>
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-8 flex space-x-4">
          <a
            href={dashboards.notionUrl}
            className="bg-black text-white border border-black px-6 py-2 rounded hover:bg-white hover:text-black"
          >
            Get Notion Template
          </a>
          <a
            href="/add-dashboard"
            className="bg-black text-white border border-black px-6 py-2 rounded hover:bg-white hover:text-black"
          >
            Add
          </a>
          <a
            href="/update-dashboard"
            className="bg-black text-white border border-black px-6 py-2 rounded hover:bg-white hover:text-black"
          >
            Update
          </a>
          <a
            className="bg-black text-white border border-black px-6 py-2 rounded hover:bg-white hover:text-black"
            onClick={() => handleDelete(dashboards.id)}
            href="/dashboards"
          >
            Delete
          </a>
        </div>
        <div className="mt-12">
          <img
            src={dashboards.imageUrl}
            alt="img"
            className="mx-auto w-full max-w-3xl"
          />
        </div>
      </main>
    </>
  );
}
