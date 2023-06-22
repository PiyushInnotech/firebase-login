"use client"
import { auth } from '@/firebaseConfig/config';
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value) {
      setError('')
    }
    setSignUpDetails({ ...signUpDetails, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!signUpDetails.email || !signUpDetails.password || !signUpDetails.name) {
      setError('Name , Email and password are Required.')
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, signUpDetails.email, signUpDetails.password)
        if (res) {
          router.push('/login')
        }
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email already exist. Use another");
        } else if (error.code === "auth/weak-password") {
          setError("Password is not strong enough")
        } else {
          setError(error.message);
        }
      }
    }
  }

  useEffect(() => {
    setError('')
  }, [])
  return (
    <div className="p-20 flex justify-center">
      <div className="w-3/5 shadow-xl bg-neutral-200 rounded-lg flex flex-col py-14 px-8">
        <h3 className="text-4xl font-bold text-center">Sign Up</h3>
        <div className="flex flex-col w-4/5 mt-8">
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900">Full Name:
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your full name"
              name="name"
              value={signUpDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900">Email Id:
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your email"
              name="email"
              value={signUpDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900">Password:
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="password"
              placeholder="Enter your Password"
              value={signUpDetails.password}
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
            Already have an account.
            <span
              className="text-blue-500 ml-1 transition duration-150 ease-in-out hover:text-blue-800 cursor-pointer"
              onClick={() => router.push('login')}
            >Login
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default SignUpPage;
