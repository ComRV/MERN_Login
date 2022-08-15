import Users from "../model/usermodel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const getUsers = async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.username });
        res.json({ nama: user.nama, username: user.username });
    } catch (error) {
        res.json({ error: error.message });
    }
}

const Register = async (req, res) => {
    const data = req.body;
    if (data.password !== data.confPassword) return res.status(400).json({ message: "konfirmasi password salah" })
    const user = new Users({
        nama: data.nama,
        username: data.username,
        password: data.password
    })
    const salt = await bcrypt.genSalt()
    const findNama = await Users.find({
        nama: req.body.nama
    }).exec()
    const findUsername = await Users.find({
        username: req.body.username
    }).exec()
    try {
        user.password = await bcrypt.hash(user.password, salt)
        if (findNama.length > 0) return res.status(400).json({ message: 'Nama telah digunakan' });
        if (findUsername.length > 0) return res.status(400).json({ message: 'Username telah digunakan' });

        await user.save();
        res.status(201).json({ message: 'Registrasi akun anda berhasil' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const Login = async (req, res) => {
    try {
        const allData = await Users.find({
            username: req.body.username
        }).exec()
        const data = allData[0]

        const match = await bcrypt.compare(req.body.password, allData[0].password)
        if (!match) return res.status(400).json({ message: "Password anda salah" })
        const accessToken = jwt.sign({ nama: data.nama, username: data.username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({ nama: data.nama, username: data.username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        await Users.updateOne(
            { username: req.body.username },
            { refreshToken }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ accessToken })



    } catch (err) {
        res.status(404).json({ message: "Username anda salah" });
    }
}

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    await Users.updateOne({ refreshToken }, { refreshToken: null })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}

export { Register, Login, getUsers, logout };
