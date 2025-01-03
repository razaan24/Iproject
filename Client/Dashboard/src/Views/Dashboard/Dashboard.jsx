import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link, useNavigate, useParams } from "react-router";
import { BaseUrl } from "../../Api/BaseUrl";
import Card from "../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../../features/dashboardSlice";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategory] = useState([]);
  const dispatch = useDispatch();

  const { dashboard, loading, error } = useSelector((state) => state.dashboard);

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${BaseUrl}/categories`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      console.log(data);

      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    dispatch(fetchAsync(search, filter));
  }, [search, filter]);

  useEffect(() => {
    if (error) {
      Toastify({
        text: error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }, [error]);

  return (
    <>
      {/* Search & Categories */}
      <section className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === "" ? "bg-black text-white" : "bg-black text-white"
              }`}
              onClick={() => setFilter("")} // Reset filter
            >
              All
            </button>
            {categories.map((category) => {
              return (
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg"
                  key={category.id}
                  value={filter}
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {/* Templates Section */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Template Card */}
          {dashboard.map((dashboard) => {
            return <Card key={dashboard.id} dashboard={dashboard} />;
          })}
        </div>
      </section>
    </>
  );
}
