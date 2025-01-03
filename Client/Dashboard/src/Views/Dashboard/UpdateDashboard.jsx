import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import { BaseUrl } from "../../Api/BaseUrl";
import Form from "../../Components/Form";

export default function UpdateDashboard() {
  const [dashboard, setDashboard] = useState({});
  const { id } = useParams();
  const navigate = useNavigate("");

  async function fetchDashboard() {
    try {
      const { data } = await axios.get(`${BaseUrl}/dashboards/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      setDashboard(data);
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

  async function handleSubmit(
    e,
    icon,
    name,
    caption,
    status,
    price,
    notionUrl,
    imageUrl,
    categoryId
  ) {
    e.preventDefault();
    try {
      const body = {
        icon,
        name,
        caption,
        status,
        price: +price,
        notionUrl,
        imageUrl,
        categoryId: +categoryId,
      };
      const { data } = await axios.put(`${BaseUrl}/dashboards/${id}`, body, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      navigate("/dashboards");
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
    } catch (error) {
      console.log(error);

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
      <Form
        dashboard={dashboard}
        handleSubmit={handleSubmit}
        propName="Edit dashboard"
      />
    </>
  );
}
