import { useState } from 'react';
import logo from '../assets/orbitLogo.png';
import "@fontsource/plus-jakarta-sans/800.css";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';

const baseURL = import.meta.env.VITE_BASE_URL;

function Signup() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name:'', // full name
    username:'',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Make the API request
      const response = await fetch(`${baseURL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' // Attaches/receives the HttpOnly session cookie
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // 3. Handle bad responses (e.g., 400, 401, 500)

      // 4. Success: Save user to Redux and redirect to dashboard/feed
      dispatch(setUser(data.user));
      navigate('/'); 

    } catch (err) {
      // 5. Failure: Save the error message to display in the UI
      setError(err.message);
    } finally {
      // Always stop the loading state whether request succeeds or fails
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
        <div className="w-full max-w-md rounded-3xl bg-slate-50 p-8 shadow-lg ring-1 ring-slate-200">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-semibold text-slate-900">Create Account</h1>
                <p className="mt-2 text-sm text-slate-500">Sign up to create your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="mb-2 block font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label htmlFor="username" className="mb-2 block font-medium text-slate-700">
                  Userame
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
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
                onClick={handleSubmit}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-2xl font-semibold text-white transition hover:bg-blue-700"
              >
                Sign up
              </button>
            </form>
            <p className='text-center text-gray-500 py-2'>or</p>
            <div>
                <Link to={'/auth'} className='flex justify-center font-bold hover:text-blue-500'>Login</Link>
            </div>
        </div>
        <p className='text-red-500 font-bold'>{error}</p>
    </div>
  );
}

export default Signup;
