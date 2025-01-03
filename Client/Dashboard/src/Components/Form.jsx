import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { BaseUrl } from "../Api/BaseUrl";
import Button from "../Components/Button";

export default function Form({ dashboard, handleSubmit, propName }) {
  const [category, setCategory] = useState([]);
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState(0);
  const [price, setPrice] = useState("");
  const [notionUrl, setNotionUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${BaseUrl}/categories`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      setCategory(data);
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
          boxShadow: "4px 4px black",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    if (dashboard) {
      setIcon(dashboard.icon);
      setName(dashboard.name);
      setCaption(dashboard.caption);
      setStatus(dashboard.status);
      setPrice(dashboard.price);
      setNotionUrl(dashboard.notionUrl);
      setImageUrl(dashboard.imageUrl);
      setCategoryId(dashboard.categoryId);
    }
  }, [dashboard]);

  useEffect(() => {
    fetchCategory();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(
      e,
      icon,
      name,
      caption,
      status,
      price,
      notionUrl,
      imageUrl,
      categoryId
    );
  }

  return (
    <>
      {/* Background */}
      <div className="absolute top-0 left-0 w-full max-h-screen object-cover z-[-1] bg-white" />

      <div className="relative top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-50 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-b p-8 rounded-lg shadow-lg max-w-md mt-24">
        <h2 className="text-2xl font-bold font-mono text-Black text-shadow-lg animate-pulse mb-5 text-center">
          Add Template
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Icon"
              name="Icon"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setIcon(e.target.value)}
              value={icon}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Caption"
              name="caption"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Status"
              name="status"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Price"
              name="price"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Notion Url"
              name="notionUrl"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setNotionUrl(e.target.value)}
              value={notionUrl}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Image Url"
              name="imageUrl"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <select
              id="category"
              className="w-56 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black text-sm font-mono font-bold rounded-lg block w-full p-2.5"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
            >
              <option value="">Select Category</option>
              {category.map((categories) => {
                return (
                  <option value={categories.id} key={categories.id}>
                    {categories.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-center">
            <Button nameProp={propName} />
          </div>
        </form>
      </div>
    </>
  );
}
