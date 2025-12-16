import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Register as RegisterAPI } from '../services/authApi';
import useAuth from '../context/authContext';


export default function Register() {
    const[name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');
    const { Register } = useAuth();
    const navigate = useNavigate();

  const handleOnchnage=(e)=>{
    const {name, value} = e.target;
    if(name === 'name') setName(value);
    if(name === 'email') setEmail(value);
    if(name === 'password') setPassword(value);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response=await RegisterAPI(name,email,password);
      
      if(response.success)
      {
        Register(response.user, response.token);
        navigate('/home');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
        console.error(err);
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }
 return (
        <main className="flex items-center justify-center w-full px-4 mt-10">
            <form onSubmit={handleSubmit} className="flex w-full flex-col max-w-96">
        
                <a href="https://prebuiltui.com" className="mb-8" title="Go to PrebuiltUI">
                    <svg className="size-10" width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m8 4.55 6.75 3.884 6.75-3.885M8 27.83v-7.755L1.25 16.19m27 0-6.75 3.885v7.754M1.655 8.658l13.095 7.546 13.095-7.546M14.75 31.25V16.189m13.5 5.976V10.212a2.98 2.98 0 0 0-1.5-2.585L16.25 1.65a3.01 3.01 0 0 0-3 0L2.75 7.627a3 3 0 0 0-1.5 2.585v11.953a2.98 2.98 0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
                            stroke="#1d293d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
        
                <h2 className="text-4xl font-medium text-gray-900">Sign up</h2>
        
                <p className="mt-4 text-base text-gray-500/90">
                    Please enter your details to create an account.
                </p>
        
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
        

         <div className="mt-10">
                    <label className="font-medium">Name</label>
                    <input
                        placeholder="Please enter your name"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleOnchnage}
                    />
                </div>
                <div className="mt-6">
                    <label className="font-medium">Email</label>
                    <input
                        placeholder="Please enter your email"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnchnage}
                    />
                </div>
        
                <div className="mt-6">
                    <label className="font-medium">Password</label>
                    <input
                        placeholder="Please enter your password"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleOnchnage}
                    />
                </div>
        
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading?'Registering...':'Register'}
                </button>
                <p className='text-center py-8'>
                    Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
                </p>
            </form>
        </main>
    );
}
