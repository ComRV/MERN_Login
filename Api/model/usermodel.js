import mongoose from "mongoose";

const Users = mongoose.model('login', {
    nama: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    }
})

export default Users