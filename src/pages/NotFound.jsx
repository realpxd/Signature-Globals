import { memo } from 'react'
import { Link } from 'react-router-dom'

const NotFound = memo(() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* 404 Number */}
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            404
          </h1>
          
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for seems to have moved. Let's help you find your perfect property instead.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-all hover:scale-105 shadow-lg"
            >
              Go Home
            </Link>
            <Link
              to="/properties"
              className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-full border-2 border-teal-600 hover:bg-teal-50 transition-all hover:scale-105"
            >
              Browse Properties
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

NotFound.displayName = 'NotFound'

export default NotFound

