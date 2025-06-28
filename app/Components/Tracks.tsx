"use client";

export default function Tracks() {
  const tracks = [
    {
      title: "Data Analytics",
      description: "Dive into data with Python & Analyze, visualize, and tell data stories.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3v18m4-10v10m-8-4v4M4 21h16" />
        </svg>
      ),
    },
    {
      title: "Programming Foundations",
      description: "Master programming logic with C, Python and data structures to build solid foundations.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z" />
        </svg>
      ),
    },
    {
      title: "Programming Foundations",
      description: "Master programming logic with C, Python and data structures to build solid foundations.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z" />
        </svg>
      ),
    }
  ];

  return (
    <section id="tracks" className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore Learning Tracks</h2>
        <p className="text-gray-300 mb-12">
          Choose a path based on your interests and career goals <span>with the help of AI</span>.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:border-white/30 transition"
            >
              <div className="mb-4 text-blue-400">{track.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{track.title}</h3>
              <p className="text-gray-400">{track.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}