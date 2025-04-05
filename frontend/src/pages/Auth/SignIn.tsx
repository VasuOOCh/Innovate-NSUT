import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

const SignIn = () => {

    const login = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const email = formData.get('email')
        const password = formData.get('password');

        // console.log(username, email,password);
        
        
    }
  return (
    <div>

        {/* SIGN IN FORM */}
        <form onSubmit={login}>
            <Input type='text' name='username' placeholder='Username'/>
            <Input type='email' name='email' placeholder='Email'/>
            <Input type='password' name='password' placeholder='Password' />
            <Button type='submit' >Sign Up</Button>
        </form>
        
    </div>
  )
}

export default SignIn