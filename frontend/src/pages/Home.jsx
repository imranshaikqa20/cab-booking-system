function Home() {

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}

      <div className="bg-black text-white py-24 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}

          <div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Ride Anywhere <br /> Anytime 🚖
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Book rides instantly with our fast and reliable cab service.
              Safe drivers, real-time tracking, and affordable fares.
            </p>

            {/* FEATURES */}

            <div className="flex flex-wrap gap-4 mb-8">

              <div className="bg-white text-black px-5 py-3 rounded-lg font-semibold">
                ✔ Fast Pickup
              </div>

              <div className="bg-white text-black px-5 py-3 rounded-lg font-semibold">
                ✔ Safe Ride
              </div>

              <div className="bg-white text-black px-5 py-3 rounded-lg font-semibold">
                ✔ Best Price
              </div>

            </div>

            {/* CTA BUTTONS */}

            <div className="flex gap-4">

              <a
                href="/login"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
              >
                Login
              </a>

              <a
                href="/register"
                className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black"
              >
                Register
              </a>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <div className="hidden md:block">

            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="cab"
              className="rounded-xl shadow-lg"
            />

          </div>

        </div>

      </div>


      {/* FEATURES SECTION */}

      <div className="bg-gray-50 py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose Our Cab Service
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white p-8 rounded-xl shadow text-center">

              <div className="text-4xl mb-4">🚖</div>

              <h3 className="font-semibold text-lg mb-2">
                Quick Ride Booking
              </h3>

              <p className="text-gray-600">
                Book a cab within seconds and get picked up by nearby drivers.
              </p>

            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">

              <div className="text-4xl mb-4">🛡</div>

              <h3 className="font-semibold text-lg mb-2">
                Safe & Verified Drivers
              </h3>

              <p className="text-gray-600">
                All drivers are verified to ensure a secure travel experience.
              </p>

            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">

              <div className="text-4xl mb-4">💰</div>

              <h3 className="font-semibold text-lg mb-2">
                Affordable Pricing
              </h3>

              <p className="text-gray-600">
                Transparent pricing with no hidden charges.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

}

export default Home;