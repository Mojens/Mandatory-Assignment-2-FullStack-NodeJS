import { Router } from 'express';
const router = Router();
import db from '../databases/connection.js';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(400).send({
            message: 'Please Fill In All Fields',
            status: 400
        });
    } else {
        const [user] = await db.all(`SELECT * FROM users WHERE email = ?`, [email]);
        if (!user) {
            return res.status(400).send({
                message: 'Could Not Find User',
                status: 400
            });
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).send({
                    message: 'Invalid Password',
                    status: 400
                });
            } else {
                req.session.user = user;
                return res.status(200).send({
                    message: 'Successfully Logged In',
                    status: 200
                });
            }
        }
    }
});

router.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (email !== 'test@outlook.dk') {
        return res.status(400).send({
            message: 'Somthing Went Wrong, Please Try Again',
            status: 400
        });
    } else {
        return res.status(200).send({
            message: 'Successfully Logged In',
            status: 200
        });
    }
});

router.post('/api/logout', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

router.post('/api/forgot-password', (req, res) => {
    console.log(req.body);
    res.send('ok');
});


export default router;
