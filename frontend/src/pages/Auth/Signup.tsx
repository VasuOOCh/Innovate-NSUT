import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '@/Redux/userSlice';

const SignUp = () => {
    const [error, setError] = useState<String | null>(null);
    const [success, setSuccess] = useState<String | null>(null);
    const [loading, setLoading] = useState<Boolean>(false);
    const navigate = useNavigate()

    const {currentUser} = useSelector((state : any) => state.user);
    const dispatch = useDispatch()

    const register = async (e: React.FormEvent<HTMLFormElement>) => {

        try {
            
            setLoading(true);
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const username = formData.get('username');
            const email = formData.get('email')
            const password = formData.get('password');

            // if (username?.toString.length == 0 ||
            //     password?.toString.length == 0 ||
            //     email?.toString.length == 0) {
            //     return setError("Values must not be empty")
            // }

            const res = await axios.post('/auth/signup', { username, email, password });
            // console.log(res.data);
            setSuccess("User created Successfully ! Login to continue")
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
            <form onSubmit={register}>
                <Input type='text' name='username' placeholder='Username' />
                <Input type='email' name='email' placeholder='Email' />
                <Input type='password' name='password' placeholder='Password' />

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <Button type='submit' >
                    {
                        loading ? "Loading..." : "Sign Up"
                    }
                </Button>
            </form>

        </div>
    )
}

export default SignUp