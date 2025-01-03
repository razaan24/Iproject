import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {/* Navbar */}
      <nav className=" flex items-center justify-between p-4 bg-white shadow">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <img
            src="https://ik.imagekit.io/3a0xukows/letter-z.png?updatedAt=1735887963196"
            alt="Logo"
            className="h-7"
          />
          <a href="/dashboards" className="text-lg font-bold text-gray-900">
            zanation
          </a>
        </div>
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="px-2 py-1 bg-black text-white rounded-md text-sm"
          >
            Log out
          </button>
        </div>
      </nav>
    </>
  );
}
