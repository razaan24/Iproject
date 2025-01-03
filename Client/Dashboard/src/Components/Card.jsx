import { Link, useNavigate } from "react-router";

export default function Card({ dashboard }) {
  const navigate = useNavigate();

  return (
    <Link
      to={`/dashboards/${dashboard.id}`}
      className="bg-white shadow rounded-lg overflow-hidden"
    >
      <img src={dashboard.imageUrl} alt="Template" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{dashboard.name}</h3>
        <p className="text-gray-600 mt-2">{dashboard.caption}</p>
        <div className="mt-4 text-gray-900 font-bold">{dashboard.status}</div>
        <div className="mt-4">
          <a
            href="/dashboard:id"
            className="px-4  py-2 bg-black text-white rounded-md"
          >
            get template
          </a>
        </div>
      </div>
    </Link>
  );
}
