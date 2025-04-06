import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '@/Redux/userSlice';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const SignIn = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  if(currentUser) {
    return <Navigate to="/laf" replace />;
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(fetchUserStart());
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username');
      const password = formData.get('password');


      const res = await axios.post('/auth/signin', { username, password });
      dispatch(fetchUserSuccess(res.data));
      setSuccess("Logged in successfully!");
      setError(null);

      // Redirect after a delay
      setTimeout(() => {
        <Navigate to="/laf" replace />;
      }, 2000);

    } catch (error: any) {
      setSuccess(null);
      console.log(error);
      setError(error?.response?.data?.message || "Something went wrong!");
      dispatch(fetchUserFailure());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-200 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Sign In</h2>

      <form onSubmit={login} className="space-y-4">
        <Input type="text" name="username" placeholder="Username" required />
        <Input type="password" name="password" placeholder="Password" required />

        {
          error && <p className='text-red-600'>{error}</p>
        }
        {
          success && <p className='text-green-600'>{error}</p>
        }

        <Button type="submit" className="w-full">
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
