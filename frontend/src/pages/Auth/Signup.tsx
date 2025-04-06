import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserFailure } from '@/Redux/userSlice';
// import alertcomp from '@/lib/alertcomp';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');

      const res = await axios.post('/auth/signup', { username, email, password });
        console.log(res);
      setSuccess("User created successfully! Redirecting to login...");
      setError(null);

      // Redirect to login after delay
      setTimeout(() => {
        navigate('/signin');
      }, 2000);

    } catch (error: any) {
      console.error(error);
      setSuccess(null);
      setError(error?.response?.data?.message || "Something went wrong.");
      dispatch(fetchUserFailure());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-200 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Create Account</h2>

      <form onSubmit={register} className="space-y-4">
        <Input type="text" name="username" placeholder="Username" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="password" name="password" placeholder="Password" required />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      {
          error && <p className='text-red-600'>{error}</p>
        }
        {
          success && <p className='text-green-600'>{error}</p>
        }

    </div>
  );
};

export default SignUp;
