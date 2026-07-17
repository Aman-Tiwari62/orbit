import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../features/auth/authSlice';
import logo from '../assets/orbitLogo.png';
import "@fontsource/plus-jakarta-sans/800.css";

const baseURL = import.meta.env.VITE_BASE_URL;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
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
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' // Attaches/receives the HttpOnly session cookie
      });

      const data = await response.json();

      // 3. Handle bad responses (e.g., 400, 401, 500)
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

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
                <h1 className="text-4xl font-semibold text-slate-900">Welcome back</h1>
                <p className="mt-2 text-sm text-slate-500">Sign in to continue to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="usernameOrEmail" className="mb-2 block font-medium text-slate-700">
                  Username/Email
                </label>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  required
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder='Enter username/email'
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
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
                  disabled={loading}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-2xl font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="56" />
                    </svg>
                    <span>Logging in...</span>
                  </span>
                ) : (
                  'Login'
                )}
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

