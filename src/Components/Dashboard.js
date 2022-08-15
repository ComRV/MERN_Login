/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
    const navigate = useNavigate()
    const logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-slate-200">
            <ul className="flex flex-row justify-between mx-40 py-2 font-sans font-normal text-lg">
                <li>Home</li>
                <li><button onClick={logout}>Logout</button></li>
            </ul>
        </div>
    )
}

const Dashboard = () => {
    const [nama, setNama] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Dashboard"
        refreshToken()
    }, [])
    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token")
            const decoded = jwt_decode(response.data.accessToken)
            setNama(decoded.nama)
        } catch (error) {
            if (error.response) {
                navigate('/')
            }
        }
    }
    return (
        <div>
            <Navbar />
            <h1 className="ml-40 my-4">Welcome back, {nama}</h1>
        </div>
    )
}

export default Dashboard