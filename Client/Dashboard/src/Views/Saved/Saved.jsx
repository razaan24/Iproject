export default function Saved() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Saved Templates</title>
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold">Easlo</div>
            <nav className="space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                Lessons
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Templates
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Blog
              </a>
            </nav>
          </div>
          <div className="space-x-4">
            <button className="text-gray-600 hover:text-black">Saved</button>
            <button className="text-gray-600 hover:text-black">Account</button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Saved</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Vocabulary Builder</h2>
            <p className="text-gray-600 mb-4">
              Expand your vocabulary while learning or improving languages.
            </p>
            <div className="text-right text-gray-600 font-semibold">$0</div>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">PARA Dashboard</h2>
            <p className="text-gray-600 mb-4">
              Simplify your life by organizing it into four sections.
            </p>
            <div className="text-right text-gray-600 font-semibold">$0</div>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Student Dashboard</h2>
            <p className="text-gray-600 mb-4">
              Organize your classes, assignments, exams, and notes in one place.
            </p>
            <div className="text-right text-gray-600 font-semibold">$0</div>
          </div>
        </div>
      </main>
    </>
  );
}
