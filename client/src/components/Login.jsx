import { useState } from 'react';
import logo from '../assets/orbitLogo.png';
import "@fontsource/plus-jakarta-sans/800.css";
import { Link } from 'react-router-dom';

function Login() {
    const error = null;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (

    <div className="flex flex-col items-center gap-3">
        <div className="w-full max-w-md rounded-[1.5rem] bg-slate-50 p-8 shadow-lg ring-1 ring-slate-200">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-semibold text-slate-900">Welcome back</h1>
                <p className="mt-2 text-sm text-slate-500">Sign in to continue to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-2xl font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </button>
            </form>
            <p className='text-center text-gray-500 py-2'>or</p>
            <div>
                <Link to={'/auth/signup'} className='flex justify-center font-bold hover:text-blue-500'>Sign up</Link>
            </div>
        </div>
        <p className='text-red-500 font-bold'>{error}</p>
    </div>
  );
}

export default Login;

