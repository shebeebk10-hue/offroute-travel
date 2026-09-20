import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import TripDetails from "./pages/TripDetails"


function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [trips, setTrips] = useState([])
  const [siteSettings, setSiteSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/trips/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Trips received from Django:", data)
        setTrips(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching trips:", error)
        setLoading(false)
      })


    fetch("http://127.0.0.1:8000/api/site-settings/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Site settings received from Django:", data)
        setSiteSettings(data)
      })
      .catch((error) => {
        console.error("Error fetching site settings:", error)
      })
  }, [])


    const whatsapp1 =
      siteSettings?.whatsapp_number_1 || "919746818189"

    const whatsapp2 =
      siteSettings?.whatsapp_number_2 || "918606708438"

    const whatsappMessage =
      "Hi Offroute! I am interested in your travel packages. Please send me the package details."

    const instagramUsername =
      siteSettings?.instagram_username || "@offroute.inn"

    const instagramUrl =
      siteSettings?.instagram_url || "https://www.instagram.com/offroute.inn/"


  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <div className="relative min-h-screen text-white">

      {/* ================= FIXED WEBSITE BACKGROUND ================= */}

      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/bgimage.jpg')" }}
      ></div>

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/20 -z-10"></div>


      {/* ================= WEBSITE CONTENT ================= */}

      <div className="relative z-10">


        {/* ================= NAVBAR ================= */}

        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">

          <div className="flex items-center justify-between px-5 md:px-8 py-4">

            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src="/offroute-logo.jpg"
                alt="Offroute"
                className="w-10 h-10 rounded-full object-cover"
              />

              <h1 className="text-xl md:text-2xl font-bold tracking-widest text-[#6F8F72]">
                OFFROUTE
              </h1>
            </a>


            {/* ================= DESKTOP NAVIGATION ================= */}

            <div className="hidden md:flex items-center gap-8 text-sm">

              <a
                href="/"
                className="hover:text-green-500 transition-all duration-300"
              >
                Home
              </a>

              <a
                href="#trips"
                className="hover:text-green-500 transition-all duration-300"
              >
                Trips
              </a>

              <a
                href="#about"
                className="hover:text-green-500 transition-all duration-300"
              >
                About
              </a>

              <a
                href="#contact"
                className="hover:text-green-500 transition-all duration-300"
              >
                Contact
              </a>

            </div>


            {/* ================= DESKTOP BOOK NOW ================= */}

            <button
              className="hidden md:block bg-green-600 px-5 py-2 rounded-full font-medium hover:bg-green-500 hover:scale-105 transition-all duration-300"
            >
              Book Now
            </button>


            {/* ================= MOBILE HAMBURGER ================= */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-green-600 transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >

              <div className="flex flex-col gap-1.5">

                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>

                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                ></span>

                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>

              </div>

            </button>

          </div>


          {/* ================= MOBILE MENU ================= */}

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
              menuOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >

            <div className="px-5 pb-5 pt-2 space-y-2 border-t border-white/10 bg-black/40 backdrop-blur-xl">

              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-white/10 active:bg-green-600/20 transition-all duration-300"
              >
                Home
              </a>

              <a
                href="#trips"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-white/10 active:bg-green-600/20 transition-all duration-300"
              >
                Trips
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-white/10 active:bg-green-600/20 transition-all duration-300"
              >
                About
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-white/10 active:bg-green-600/20 transition-all duration-300"
              >
                Contact
              </a>

              <button
                onClick={() => setMenuOpen(false)}
                className="w-full mt-2 bg-green-600 hover:bg-green-500 active:bg-green-700 px-5 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Book Now →
              </button>

            </div>

          </div>

        </nav>



        {/* ================= HERO SECTION ================= */}

        <section className="min-h-[100svh] flex items-center justify-center px-5 sm:px-8 pt-24 pb-12 text-center">

          <div className="max-w-4xl w-full">

            {/* Small Heading */}

            <p className="text-green-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-5 sm:mb-6">
              {siteSettings?.hero_title || "Travel Beyond The Ordinary"}
            </p>


            {/* Main Heading */}

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              Go <span className="text-[#16A34A]">Offroute.</span>
              <br />
              See the <span className="text-[#16A34A]">Unseen.</span>
            </h2>


            {/* Description */}

            <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 px-2">
              {siteSettings?.hero_description ||
                "Discover breathtaking destinations, unforgettable treks, and experiences that take you off the beaten path."}
            </p>


            {/* Hero Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">

              <button
                onClick={() =>
                  document.getElementById("trips")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="w-full sm:w-auto bg-[#16A34A] text-white hover:bg-[#15803D] active:bg-[#166534] hover:scale-105 hover:-translate-y-0.5 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 ease-out"
              >
                Explore Trips →
              </button>


              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="w-full sm:w-auto border border-white/30 hover:bg-black hover:border-white/50 hover:text-white active:bg-black hover:scale-105 hover:-translate-y-0.5 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 ease-out"
              >
                Contact Us
              </button>

            </div>

          </div>

        </section>



        {/* ================= UPCOMING TRIPS ================= */}

        <section
          id="trips"
          className="relative px-8 py-24 bg-black/60"
        >
          <div className="max-w-7xl mx-auto">


            {/* Section Heading */}

            <div className="text-center mb-14">

              <p className="text-green-500 uppercase tracking-[0.3em] text-sm mb-4">
                Upcoming Adventures
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mb-5">
                Explore Your Next Escape
              </h2>

              <p className="text-gray-300 max-w-2xl mx-auto">
                Discover our upcoming adventures and find the perfect
                escape for your next journey.
              </p>

            </div>



            {/* ================= TRIP CARDS ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {loading ? (
                <p className="text-gray-400 col-span-full text-center">
                  Loading trips...
                </p>
              ) : trips.length === 0 ? (
                <p className="text-gray-400 col-span-full text-center">
                  No trips available.
                </p>
              ) : (
                trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="group relative h-[420px] rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/60 hover:-translate-y-2 transition-all duration-500 ease-out"
                  >

                    {/* Card Background Image */}

                    <img
                      src={trip.card_image}
                      alt={trip.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Card Gradient */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    {/* Featured Badge */}

                    {trip.featured && (
                      <div className="absolute top-5 left-5">
                        <span className="bg-green-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg">
                          Featured Trip
                        </span>
                      </div>
                    )}

                    {/* Card Content */}

                    <div className="relative z-10 h-full flex flex-col justify-end p-6">

                      <p className="text-green-400 text-sm mb-2">
                        {trip.destination}
                      </p>

                      <h3 className="text-3xl font-bold mb-3">
                        {trip.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-6">
                        {trip.short_description}
                      </p>

                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-gray-400 text-xs">
                            Duration
                          </p>

                          <p className="text-lg font-semibold">
                            {trip.duration}
                          </p>
                        </div>

                        <a
                          href={`/trips/${trip.slug}`}
                          className="text-green-400 hover:text-green-300 hover:translate-x-1 transition-all duration-500"
                        >
                          View Trip →
                        </a>

                      </div>

                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </section>

        {/* ================= ABOUT SECTION ================= */}

        <section
          id="about"
          className="px-5 md:px-8 py-20 md:py-24 bg-[#080b08]/80 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

              {/* About Content */}

              <div>

                <p className="text-green-400 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4">
                  About Offroute
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                  {siteSettings?.about_title || "Travel Beyond The Ordinary."}
                </h2>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-5">
                  {siteSettings?.about_description ||
                    "Offroute is all about discovering places, experiences, and adventures beyond the usual tourist routes."}
                </p>

                <p className="text-gray-400 leading-relaxed mb-8">
                  From mountain treks and offbeat escapes to customized trips
                  across India, we create travel experiences based on your
                  destination, schedule, group, and preferences.
                </p>


                {/* Small Highlights */}

                <div className="grid grid-cols-2 gap-4">

                  <div className="border border-white/10 bg-white/5 rounded-xl p-5">
                    <p className="text-2xl font-bold text-green-400">
                      10+
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Destinations
                    </p>
                  </div>

                  <div className="border border-white/10 bg-white/5 rounded-xl p-5">
                    <p className="text-2xl font-bold text-green-400">
                      Custom
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Travel Packages
                    </p>
                  </div>

                </div>

              </div>


              {/* About Image */}

              <div className="relative">

                <div className="rounded-3xl overflow-hidden border border-white/10">

                  <img
                      src={siteSettings?.about_image || "/bgimage.jpg"}
                    alt="Offroute Adventure"
                    className="w-full h-[420px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  />

                </div>

                {/* Floating Card */}

                <div className="absolute bottom-5 left-5 right-5 sm:left-8 sm:right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

                  <p className="text-green-400 text-sm font-medium mb-1">
                    Your Journey. Your Way.
                  </p>

                  <p className="text-gray-200 text-sm">
                    Customized experiences designed around you.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ================= CONTACT SECTION ================= */}

        <section
          id="contact"
          className="px-5 md:px-8 py-20 md:py-24 bg-black/70 backdrop-blur-sm"
        >
          <div className="max-w-5xl mx-auto text-center">

            <p className="text-green-400 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4">
              Get In Touch
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold mb-5">
              Ready For Your Next Escape?
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Have a destination in mind or looking for a customized trip?
              Contact Offroute and let's plan your next adventure.
            </p>


            {/* ================= WHATSAPP ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">

              {/* WhatsApp 1 */}

              <a
                href={`https://wa.me/${whatsapp1}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/10 bg-white/5 rounded-2xl p-6 text-left hover:border-green-500/60 hover:bg-green-500/10 active:bg-green-500/20 transition-all duration-300"
              >
                <p className="text-gray-400 text-sm mb-2">
                  WhatsApp
                </p>

                <p className="text-xl font-semibold group-hover:text-green-400 transition-colors">
                  {whatsapp1}
                </p>

                <p className="text-green-400 text-sm mt-4">
                  Message on WhatsApp →
                </p>
              </a>


              {/* WhatsApp 2 */}

              <a
                href={`https://wa.me/${whatsapp2}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/10 bg-white/5 rounded-2xl p-6 text-left hover:border-green-500/60 hover:bg-green-500/10 active:bg-green-500/20 transition-all duration-300"
              >
                <p className="text-gray-400 text-sm mb-2">
                  WhatsApp
                </p>

                <p className="text-xl font-semibold group-hover:text-green-400 transition-colors">
                  {whatsapp2}
                </p>

                <p className="text-green-400 text-sm mt-4">
                  Message on WhatsApp →
                </p>
              </a>

            </div>


            {/* ================= INSTAGRAM ================= */}

            <div className="mt-12 pt-8 border-t border-white/10">

              <p className="text-gray-400 text-sm mb-3">
                Follow our adventures
              </p>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 text-lg font-semibold hover:text-green-300 transition-colors"
              >
                {instagramUsername}
              </a>

            </div>

          </div>
        </section>


      </div>

                </div>
          }
        />

        <Route
          path="/trips/:slug"
          element={<TripDetails />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App