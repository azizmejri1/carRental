import Navbar from "./navbar";
import SearchForm from "./searchForm";

export default function MainPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-white"></div>

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRINnYtMmgzMHYyem0wLTE2SDZ2LTJoMzB2MnptMTYgMTZoLTZ2LTJoNnYyem0wLTE2aC02di0yaDZ2MnptMCAxNkg2di0yaDQ2djJ6bTAtMTZINnYtMmg0NnYyem0tMTYgMTZoLTZ2LTJoNnYyem0wLTE2aC02di0yaDZ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 py-16">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Affordable & Convenient
            </span>
            <br className="hidden md:block" />
            <span className="text-gray-700">Car Rentals!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect vehicle for your journey at unbeatable prices.
          </p>
        </div>

        {/* Search Form with light border */}
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200">
          <div className="bg-gradient-to-r from-blue-100/50 to-blue-200/30 rounded-lg p-1">
            <SearchForm />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
            <svg
              className="w-4 h-4 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            No hidden fees
          </div>
          <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
            <svg
              className="w-4 h-4 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            24/7 customer support
          </div>
          <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
            <svg
              className="w-4 h-4 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Free cancellation
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
    </div>
  );
}
