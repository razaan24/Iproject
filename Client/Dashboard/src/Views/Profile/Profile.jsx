export default function Profile() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Page</title>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Easlo</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-black">
            Lessons
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Templates
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Blog
          </a>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
            Saved
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
            Account
          </button>
        </div>
      </nav>
      {/* Account Section */}
      <section className="flex items-center justify-center py-12">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 text-center">
          <div className="flex justify-center">
            <div className="bg-gray-300 rounded-full h-20 w-20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422M6.84 10.578l6.16 3.422M6 21V9M18 21V9m-6-6v6"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-4">aku</h2>
          <p className="text-gray-600 mt-1">daffarazann@gmail.com</p>
          <div className="mt-6">
            <button className="w-full bg-black text-white py-2 rounded-lg font-semibold mb-4">
              Manage Subscription
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
              Change Password
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
