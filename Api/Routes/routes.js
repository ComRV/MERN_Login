import Express from "express";
import { refreshToken } from "../controller/refreshToken.js";
import { Register, Login, getUsers, logout } from "../controller/usercontroller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = Express.Router()

router.get('/Users', verifyToken, getUsers)
router.post('/Register', Register)
router.post('/Login', Login)
router.get('/token', refreshToken)
router.delete('/logout', logout)
export default router;