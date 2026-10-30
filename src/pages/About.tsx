export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative h-[420px] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d0a0a 50%, #1a1a1a 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 50%, #E92426 0%, transparent 60%), radial-gradient(circle at 75% 50%, #E92426 0%, transparent 60%)"
          }}
        />
        <div className="relative text-center px-6">
          <p className="text-[#E92426] text-xs tracking-[0.4em] uppercase font-semibold mb-4">Est. 2021</p>
          <h1
            className="text-5xl sm:text-7xl font-semibold italic text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Story
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Born from a love of art, culture, and the stories figures can tell.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-[#E92426] text-xs tracking-[0.35em] uppercase font-semibold mb-4">Who We Are</p>
            <h2
              className="text-4xl font-semibold text-gray-900 mb-6 leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Where Collectibles Meet Passion
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              <p>
                Aelyn was founded by a small group of collectors who believed that art figures deserve more than a shelf — they deserve a home. We curate only the most distinctive designer toys and limited-edition art figures from acclaimed series around the world.
              </p>
              <p>
                From the whimsical universes of DIMOO and Molly, to the bold expressionism of Hirono and the playful energy of PUCKY, every piece in our collection is chosen with intention. We don't just sell figures — we bring characters to life.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
              <div className="text-4xl font-bold text-[#E92426] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>200+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Figures in Collection</div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
              <div className="text-4xl font-bold text-[#E92426] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>12K+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Happy Collectors</div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
              <div className="text-4xl font-bold text-[#E92426] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>8</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Exclusive Series</div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
              <div className="text-4xl font-bold text-[#E92426] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>4.9★</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-14">
            <p className="text-[#E92426] text-xs tracking-[0.35em] uppercase font-semibold mb-3">What Drives Us</p>
            <h2
              className="text-4xl font-semibold text-gray-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "✦",
                title: "Curation Over Quantity",
                desc: "Every piece we stock is handpicked. We only carry figures we would proudly display in our own homes. No fillers, no compromises.",
              },
              {
                icon: "◈",
                title: "Authentic & Verified",
                desc: "All our figures are sourced directly from official distributors. Every item is 100% authentic, sealed, and ready to collect.",
              },
              {
                icon: "❋",
                title: "Community First",
                desc: "We are collectors ourselves. We build relationships, not just transactions. Our community is at the heart of everything we do.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-[#E92426]/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="text-3xl text-[#E92426] mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-3xl p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d0a0a 100%)",
          }}
        >
          <p
            className="text-white text-3xl sm:text-4xl font-semibold italic mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Every figure tells a story. <br /> Let yours begin here."
          </p>
          <p className="text-gray-500 text-sm mb-8">— The Aelyn Team</p>
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[#E92426] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white hover:text-[#E92426] transition-colors duration-300"
          >
            Explore Our Collection
          </a>
        </div>
      </div>
    </div>
  )
}
