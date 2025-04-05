import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '@/Redux/userSlice';
import axios from 'axios';
import alertcomp from '@/lib/alertcomp';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        navigate('/');
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

        <Button type="submit" className="w-full">
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {error && (
        alertcomp("Error", error, "destructive") 
      )}

      {success && (
        alertcomp("Success", success, "default")
      )}
    </div>
  );
};

export default SignIn;
