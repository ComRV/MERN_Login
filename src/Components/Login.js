import { useEffect, useState } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
    useEffect(() => {
        document.title = "Login"
    }, [])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const auth = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/Login", { username, password })
            navigate('/dashboard')
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message)
            }
        }
    }
    return (
        <div className="flex h-screen">
            <div className="container m-auto border-2 border-slate-300 bg-blue-50 h-3/5 w-2/5 rounded-lg">
                <h1 className="text-center text-3xl mt-5 font-Comfortaa text-slate-900">Your Data</h1>
                {msg && <p className="mt-6 ml-14 font-sans font-medium w-4/5 text-red-500 bg-red-100 rounded pl-3 py-2">{msg}</p>}
                <form className="mt-5" onSubmit={auth}>
                    <div className="flex flex-col">
                        <label className="text-lg font-sans font-medium text-slate-900 md:ml-14 ">Username</label>
                        <input type="text" className="m-auto h-10 text-lg w-4/5 border-2 font-400 border-blue-200 rounded px-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-lg font-sans font-medium text-slate-900 md:ml-14 ">Password</label>
                        <input type="password" className="m-auto h-10 text-lg w-4/5 border-2 font-400 border-blue-200 rounded px-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mt-5 md:ml-14">
                        <button className="transition bg-blue-500 font-sans font-medium rounded text-lg px-5 py-0.5 hover:bg-blue-600 duration-150 active:bg-blue-700 text-slate-200">Login</button>
                    </div>

                </form>
                <Link to="/registrasi">
                    <button className="transition bg-blue-500 font-sans font-medium rounded text-lg px-5 py-0.5 ml-5 relative bottom-8 left-36 hover:bg-blue-600 duration-150 active:bg-blue-700 text-slate-200" >Register</button>
                    <Outlet />
                </Link>
            </div>
        </div>
    )
}

export default Login