import { request } from '@/api'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '@/redux/slices/token-slice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dipatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = e => {
    e.preventDefault()
    setLoading(true)
    let formData = new FormData(e.target)
    const user = Object.fromEntries(formData)

    request
      .post("/auth/signin-admin", user)
      .then(res => {
        dipatch(signIn(res.data.access_token))
        navigate("/admin")
      })
      .catch(err => {
        alert(err.response.data.message.message)
      })
      .finally(()=> setLoading(false))
  }
  return (
    <div>
      <h2>Login</h2>
      <form 
  onSubmit={handleSignIn} 
  className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
>
  <h2 className="text-xl font-bold text-gray-700 text-center">Sign In</h2>
  
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
  
  <button 
    type="submit" 
    disabled={loading} 
    className={`w-full py-2 rounded-lg text-white ${
      loading 
        ? "bg-gray-400 cursor-not-allowed" 
        : "bg-blue-500 hover:bg-blue-600 transition duration-300"
    }`}
  >
    {loading ? (
      <div className="flex justify-center items-center space-x-2">
        <span className="loader w-4 h-4 border-2 border-t-2 border-t-white rounded-full animate-spin"></span>
        <span>Loading...</span>
      </div>
    ) : (
      "Sign In"
    )}
  </button>
</form>

    </div>
  )
}

export default Login