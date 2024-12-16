import { request } from '@/api'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '@/redux/slices/token-slice'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dipatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = e => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let user = Object.fromEntries(formData)

    console.log(user);
    
    request
      .post("/auth/signup-admin", user)
      .then(res => {
        console.log(res);
        dipatch(signIn(res.data.access_token))
        navigate("/admin")
      })

  }
  return (
    <div>
      <h2>Register</h2>
      <form 
  onSubmit={handleSignUp} 
  className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
>
  <h2 className="text-xl font-bold text-gray-700 text-center">Sign Up</h2>
  
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">Name</label>
    <input 
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" 
      type="text" 
      name="name" 
      placeholder="Enter your name" 
    />
  </div>
  
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">Email</label>
    <input 
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" 
      type="email" 
      name="email" 
      placeholder="Enter your email" 
    />
  </div>
  
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">Password</label>
    <input 
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" 
      type="password" 
      name="password" 
      placeholder="Enter your password" 
    />
  </div>
  
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
    <input 
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" 
      type="password" 
      name="confirm_password" 
      placeholder="Confirm your password" 
    />
  </div>
  
  <button 
    type="submit" 
    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
  >
    Sign Up
  </button>
</form>

    </div>
  )
}

export default Register