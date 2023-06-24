"use client"
import { auth } from "@/firebaseConfig/config.js";
import {
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const HomeView = () => {
    const [user, setUser] = useState(null)
    const router = useRouter()
    const unSub = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                router.push('/login')
            }
        })
    }

    const handleLogout = async (e) => {
        await signOut(auth)
        setUser(null)
        router.push('/login')
    }
    useEffect(() => {
        unSub()
    }, [])
    return (

        <div>
            {user && (
                <div className="flex justify-center items-center py-10 px-20">
                    <h1 className="mb-6 text-4xl mx-auto">Welcome {user.email} </h1>
                    <button type="button"
                        className="text-white items-center w-fit bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleLogout}
                    >Logout</button>
                </div>
            )
            }
        </div>
    )
}
export default HomeView;
