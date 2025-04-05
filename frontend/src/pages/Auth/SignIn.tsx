import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '@/Redux/userSlice'
import axios from 'axios'

const SignIn = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<String | null>(null);
  const [success, setSuccess] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()

  const login = async (e: React.FormEvent<HTMLFormElement>) => {

    try {
      e.preventDefault();
      dispatch(fetchUserStart())
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username');
      const password = formData.get('password');

      const res = await axios.post('/auth/signin', { username, password });
      console.log(res);
      dispatch(fetchUserSuccess(res.data));
      setSuccess("Logged In !")
      setError(null)

    } catch (error: any) {
      console.log(error);
      setSuccess(null)
      setError(error.response.data.message)
      dispatch(fetchUserFailure())
    } finally {
      setLoading(false)
    }


  }
  return (
    <div>

      {/* SIGN IN FORM */}
      <form onSubmit={login}>
        <Input type='text' name='username' placeholder='Username' />
        <Input type='password' name='password' placeholder='Password' />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <Button type='submit' >
          {
            loading ? "Loading..." : "Sign In"
          }
        </Button>
      </form>

    </div>
  )
}

export default SignIn