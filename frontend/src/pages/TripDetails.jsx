import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function TripDetails() {
  const { slug } = useParams()

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"

  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE_URL}/trips/${slug}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Trip not found")
        }

        return response.json()
      })
      .then((data) => {
        console.log("Trip received from Django:", data)
        setTrip(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching trip:", error)
        setError(true)
        setLoading(false)
      })
  }, [slug])

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">
          Loading trip...
        </p>
      </div>
    )
  }

  /* ================= ERROR ================= */

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">

        <h1 className="text-3xl font-bold mb-4">
          Trip Not Found
        </h1>

        <p className="text-gray-400 mb-8">
          Sorry, we couldn't find this trip.
        </p>

        <a
          href="/"
          className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-full font-semibold transition"
        >
          ← Back to Trips
        </a>

      </div>
    )
  }

  /* ================= WHATSAPP ================= */

  const whatsappNumber =
    trip.whatsapp_number || "919746818189"

  const whatsappMessage =
    trip.whatsapp_message ||
    `Hi Offroute! I am interested in the ${trip.title} trip. Please send me the package details.`

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    )
  }

  return (
    <div className="relative min-h-screen text-white">

      {/* ================= FIXED BACKGROUND ================= */}

      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/bgimage.jpg')" }}
      ></div>

      {/* Dark overlay */}

      <div className="fixed inset-0 bg-black/30 -z-10"></div>


      {/* ================= PAGE CONTENT ================= */}

      <div className="relative z-10">


        {/* ================= HERO ================= */}

        <section className="relative h-[75svh] min-h-[520px] md:h-[75vh] md:min-h-[550px] overflow-hidden">

          <img
            src={trip.hero_image}
            alt={trip.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"></div>


          {/* Back Button */}

          <a
            href="/"
            className="fixed top-4 left-4 md:top-6 md:left-6 z-50 border border-white/20 bg-black/30 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base hover:bg-black hover:border-white/40 transition-all duration-300"
          >
            ← Back to Trips
          </a>


          {/* Hero Content */}

          <div className="absolute bottom-0 left-0 right-0 z-10">

            <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-10 sm:pb-12 md:pb-14">

              <p className="text-green-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-3 sm:mb-4">
                {trip.label || "Offroute Travel"}
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] mb-4 sm:mb-5 max-w-4xl">
                {trip.title}
              </h1>

              <p className="text-green-400 text-base sm:text-lg mb-3">
                {trip.destination}
              </p>

              <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                {trip.short_description}
              </p>

            </div>

          </div>

        </section>


        {/* ================= PACKAGE OVERVIEW ================= */}

        <section className="px-5 sm:px-8 py-12 md:py-16 bg-black/70 backdrop-blur-sm">

          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">


              {/* Destination */}

              <div className="group border border-white/10 bg-white/[0.04] rounded-2xl p-4 sm:p-6 hover:border-green-500/40 hover:bg-white/[0.07] transition-all duration-300">

                <p className="text-gray-500 text-xs sm:text-sm mb-2">
                  Destination
                </p>

                <p className="text-lg sm:text-xl font-semibold">
                  {trip.destination}
                </p>

              </div>


              {/* Duration */}

              <div className="group border border-white/10 bg-white/[0.04] rounded-2xl p-4 sm:p-6 hover:border-green-500/40 hover:bg-white/[0.07] transition-all duration-300">

                <p className="text-gray-500 text-xs sm:text-sm mb-2">
                  Duration
                </p>

                <p className="text-lg sm:text-xl font-semibold">
                  {trip.duration}
                </p>

              </div>


              {/* Experience */}

              <div className="group border border-white/10 bg-white/[0.04] rounded-2xl p-4 sm:p-6 hover:border-green-500/40 hover:bg-white/[0.07] transition-all duration-300">

                <p className="text-gray-500 text-xs sm:text-sm mb-2">
                  Experience
                </p>

                <p className="text-lg sm:text-xl font-semibold text-green-400">
                  {trip.label || "Adventure"}
                </p>

              </div>


              {/* Booking */}

              <div className="group border border-white/10 bg-white/[0.04] rounded-2xl p-4 sm:p-6 hover:border-green-500/40 hover:bg-white/[0.07] transition-all duration-300">

                <p className="text-gray-500 text-xs sm:text-sm mb-2">
                  Booking
                </p>

                <p className="text-lg sm:text-xl font-semibold">
                  WhatsApp
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= TRIP DESCRIPTION ================= */}

        {trip.description && (
          <section className="px-5 sm:px-8 py-16 md:py-20 bg-[#080b08]/80 backdrop-blur-sm">

            <div className="max-w-4xl mx-auto">

              <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
                About This Trip
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {trip.title}
              </h2>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {trip.description}
              </p>

            </div>

          </section>
        )}


        {/* ================= PACKAGE DETAILS ================= */}

        {trip.package_details && (
          <section className="px-5 sm:px-8 py-16 md:py-20 bg-black/70 backdrop-blur-sm">

            <div className="max-w-4xl mx-auto">

              <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
                Package Details
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                What's Included
              </h2>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {trip.package_details}
              </p>

            </div>

          </section>
        )}


        {/* ================= INCLUDED / EXCLUDED ================= */}

        {(trip.included || trip.excluded) && (
          <section className="px-5 sm:px-8 py-16 md:py-20 bg-[#080b08]/80 backdrop-blur-sm">

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">


              {/* Included */}

              {trip.included && (
                <div className="border border-white/10 bg-white/5 rounded-2xl p-7">

                  <h3 className="text-2xl font-bold mb-5 text-green-400">
                    Included
                  </h3>

                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {trip.included}
                  </p>

                </div>
              )}


              {/* Excluded */}

              {trip.excluded && (
                <div className="border border-white/10 bg-white/5 rounded-2xl p-7">

                  <h3 className="text-2xl font-bold mb-5">
                    Not Included
                  </h3>

                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {trip.excluded}
                  </p>

                </div>
              )}

            </div>

          </section>
        )}


        {/* ================= ITINERARY ================= */}

        <section className="px-5 sm:px-8 py-16 md:py-20 bg-black/70 backdrop-blur-sm">

          <div className="max-w-5xl mx-auto">

            <div className="max-w-2xl mb-12">

              <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
                Your Journey
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
                Day-by-Day Itinerary
              </h2>

            </div>


            {trip.itinerary && trip.itinerary.length > 0 ? (

              /* ================= ITINERARY AVAILABLE ================= */

              <div className="space-y-5">

                {trip.itinerary.map((day) => (

                  <div
                    key={day.id}
                    className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-7 hover:border-green-500/40 transition-all duration-300"
                  >

                    <div className="flex items-start gap-5">

                      <div className="shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold">
                        {day.day_number}
                      </div>

                      <div>

                        <p className="text-gray-500 text-sm mb-1">
                          Day {day.day_number}
                        </p>

                        <h3 className="text-xl md:text-2xl font-semibold mb-3">
                          {day.title}
                        </h3>

                        <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                          {day.description}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              /* ================= NO ITINERARY ================= */

              <div className="border border-white/10 bg-white/5 rounded-3xl p-8 sm:p-10 md:p-14 text-center">

                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">

                  <span className="text-2xl">✦</span>

                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  Itinerary Details Coming Soon
                </h3>

                <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
                  Every journey with Offroute is planned with care.
                  For the complete day-by-day itinerary and trip details,
                  get in touch with us directly.
                </p>

                <a>
                  Contact Us on WhatsApp
                </a>

              </div>

            )}

          </div>

        </section>


        {/* ================= GALLERY ================= */}

        {trip.gallery_images && trip.gallery_images.length > 0 && (
          <section className="px-5 sm:px-8 py-16 md:py-20 bg-[#080b08]/80 backdrop-blur-sm">

            <div className="max-w-7xl mx-auto">

              <div className="max-w-2xl mb-10">

                <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
                  Explore
                </p>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  Trip Gallery
                </h2>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                {trip.gallery_images
                  .sort((a, b) => a.order - b.order)
                  .map((image) => (

                    <div
                      key={image.id}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group"
                    >

                      <img
                        src={image.image}
                        alt={image.caption || trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-5 pt-12">

                          <p className="text-sm text-gray-200">
                            {image.caption}
                          </p>

                        </div>
                      )}

                    </div>

                  ))}

              </div>

            </div>

          </section>
        )}


        {/* ================= IMPORTANT INFORMATION ================= */}

        {trip.important_information && (
          <section className="px-5 sm:px-8 py-16 md:py-20 bg-black/70 backdrop-blur-sm">

            <div className="max-w-4xl mx-auto">

              <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
                Important Information
              </p>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {trip.important_information}
              </p>

            </div>

          </section>
        )}


        {/* ================= CUSTOMIZED PACKAGE ================= */}

        <section className="px-8 py-20 bg-black/70 backdrop-blur-sm">

          <div className="max-w-4xl mx-auto text-center">

            <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
              Your Journey. Your Way.
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Interested in this trip?
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Contact Offroute for package details, availability and
              customized travel options.
            </p>


            {/* WhatsApp */}

            <button
              onClick={openWhatsApp}
              className="bg-green-600 hover:bg-green-500 hover:scale-105 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 shadow-lg shadow-green-900/30"
            >
              Enquire on WhatsApp →
            </button>

          </div>

        </section>


        {/* ================= CONTACT ================= */}

        <section className="px-8 py-20 bg-[#080b08]/80 backdrop-blur-sm">

          <div className="max-w-5xl mx-auto text-center">

            <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">
              Get In Touch
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Ready For Your Next Escape?
            </h2>

            <p className="text-gray-400 mb-12">
              Contact Offroute for package details and customized trips.
            </p>


            <div className="flex justify-center">

              <button
                onClick={openWhatsApp}
                className="group border border-white/10 bg-white/5 rounded-2xl p-7 text-left hover:border-green-500/60 hover:bg-green-500/10 transition-all duration-500 w-full md:max-w-md"
              >

                <p className="text-gray-400 text-sm mb-2">
                  WhatsApp
                </p>

                <p className="text-xl font-semibold group-hover:text-green-400 transition-colors">
                  {trip.whatsapp_number
                    ? `+${trip.whatsapp_number}`
                    : "+91 97468 18189"}
                </p>

                <p className="text-green-400 text-sm mt-4">
                  Message on WhatsApp →
                </p>

              </button>

            </div>

          </div>

        </section>


        {/* ================= INSTAGRAM ================= */}

        <section className="px-8 py-16 bg-black/70 backdrop-blur-sm text-center">

          <p className="text-gray-400 mb-3">
            Follow our adventures
          </p>

          <a
            href="https://www.instagram.com/offroute.inn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 text-xl font-semibold hover:text-green-300 transition"
          >
            @offroute.inn
          </a>

        </section>

      </div>

    </div>
  )
}

export default TripDetails