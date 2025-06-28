


"use client";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-300 mb-12">
          A simple 3-step process to get you started with DevMate.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      
          <div className="flex flex-col items-center text-center">
            <a href="/login">
              <div className="bg-white text-black rounded-full p-4 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </a>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-400">
              Create your free account in minutes with just your email and a password.
            </p>
          </div>

    
          <div className="flex flex-col items-center text-center">
          <a href="/login">
            <div className="bg-white text-black rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l-4-4 4-4m8 8l4-4-4-4" />
              </svg>
            </div>
            </a>
            <h3 className="text-xl font-semibold mb-2">Choose Track</h3>
            <p className="text-gray-400">
              Select the tools and features that fit your workflow and needs.
            </p>
          </div>

      
          <div className="flex flex-col items-center text-center">
          <a href="/login">
            <div className="bg-white text-black rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            </a>
            <h3 className="text-xl font-semibold mb-2">Start Using DevMate</h3>
            <p className="text-gray-400">
              Access your dashboard and explore features right away. You're all set!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

