import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import { BaseUrl } from "../../Api/BaseUrl";
import Form from "../../Components/Form";

export default function AddDashboard() {
  const navigate = useNavigate();

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

      const { data } = await axios.post(`${BaseUrl}/dashboards`, body, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      console.log(data);

      navigate("/dashboards");
      Toastify({
        text: `Succeed add new data ${data.data.title}`,
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

  return (
    <>
      <Form handleSubmit={handleSubmit} propName="Add Dashboard" />
    </>
  );
}
