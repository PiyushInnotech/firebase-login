"use client"
import { auth } from "@/firebaseConfig/config.js"
import {
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value) {
      setError('')
    }
    setLoginDetails({ ...loginDetails, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!loginDetails.email || !loginDetails.password) {
      setError('Email and password are Required.')
    } else {
      try {
        const res = await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
        if (res) {
          router.push('/')
        }
      } catch (error) {
        setError("Email or password is not valid")
      }
    }
  }

  useEffect(() => {
    setError('')
  }, [])
  return (
    <div className="p-20 flex justify-center">
      <div className="w-3/5 shadow-xl bg-neutral-200 rounded-lg flex flex-col py-14 px-8">
        <h3 className="text-4xl font-bold text-center">Login</h3>
        <div className="flex flex-col w-4/5 mt-8">
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900">Your email
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email"
              name="email"
              value={loginDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900">Your password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="password"
              placeholder="Enter your Password"
              value={loginDetails.password}
              onChange={handleChange}
            />
          </div>
          <h4 className="text-red-600 mb-6">{error}</h4>
          <button
            onClick={handleSubmit}
            className="text-white w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don't have an account?
            <span
              className="text-red-500 ml-1 transition duration-150 ease-in-out hover:text-danger-800 cursor-pointer"
              onClick={() => router.push('signup')}
            >Register
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default LoginPage;
