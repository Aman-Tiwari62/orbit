import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <div className="mb-4 text-6xl font-black text-blue-600">404</div>
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">Page not found</h1>
        <p className="mb-6 text-sm leading-6 text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/"
          className="inline-flex rounded-2xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
