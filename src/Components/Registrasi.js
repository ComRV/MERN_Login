import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Registrasi = () => {
    const [nama, setNama] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setconfPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const register = async (e) => {
        try {
            e.preventDefault()
            const data = await axios.post('http://localhost:5000/Register', { nama, username, password, confPassword })
            setMsg(data.data.message)
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        document.title = "Registrasi"
    }, [])
    return (
        <div className="flex h-screen">
            <div className="container m-auto border-2 border-slate-300 bg-blue-50 h-3/4 w-2/5 rounded-lg">
                <h1 className="text-center text-3xl mt-5 font-Comfortaa text-slate-900">Your Data</h1>
                {msg === "Registrasi akun anda berhasil" ? <p className="mt-6 ml-14 font-sans font-medium w-4/5 text-green-500 bg-green-100 rounded pl-3">{msg}</p> : <p className="mt-6 ml-14 font-sans font-medium w-4/5 text-red-500 bg-red-100 rounded pl-3">{msg}</p>}
                <form className="mt-4" onSubmit={register}>
                    <div className="flex flex-col">
                        <label className="ml-14 text-md font-sans font-medium text-slate-900">Nama Lengkap</label>
                        <input type="text" className="m-auto h-8 text-md w-4/5 border-2 font-400 border-blue-200 rounded px-2" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)
                        } />
                    </div>

                    <div className="flex flex-col">
                        <label className="ml-14 text-md font-sans font-medium text-slate-900">Username</label>
                        <input type="text" className="m-auto h-8 text-md w-4/5 border-2 font-400 border-blue-200 rounded px-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)
                        } />
                    </div>

                    <div className="flex flex-col">
                        <label className="ml-14 text-md font-sans font-medium text-slate-900">Password</label>
                        <input type="password" className="m-auto h-8 text-md w-4/5 border-2 font-400 border-blue-200 rounded px-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)
                        } />
                    </div>

                    <div className="flex flex-col">
                        <label className="ml-14 text-md font-sans font-medium text-slate-900">Konfirmasi Password</label>
                        <input type="password" className="m-auto h-8 text-md w-4/5 border-2 font-400 border-blue-200 rounded px-2" placeholder="Konfirmasi Password" value={confPassword} onChange={(e) => setconfPassword(e.target.value)
                        } />
                    </div>

                    <div className="ml-14 mt-5">
                        <button className="transition bg-blue-500 font-sans font-medium rounded text-md px-5 py-0.5 hover:bg-blue-600 duration-150 active:bg-blue-700 text-slate-200" >Registrasi</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Registrasi