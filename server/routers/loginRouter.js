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

router.get('/api/users', async (req, res) => {
    const users = await db.all(`SELECT * FROM users`);
    res.send(users);
})

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Body: ", req.body)
    if (!email || !password) {
        return res.status(400).send({
            message: 'Please Fill In All Fields',
            status: 400
        });
    } else {
        const [user] = await db.all(`SELECT * FROM users WHERE LOWER(email) = ?`, [email.toLowerCase()]);
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
                const { password, ...userWithoutPassword } = user; // Get all properties from user except password
                req.session.user = userWithoutPassword;
                console.log("Session: ", req.session.user)
                return res.status(200).send({
                    message: 'Successfully Logged In',
                    status: 200
                });
            }
        }
    }
});

router.post('/api/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send({
            message: 'Please Fill In All Fields',
            status: 400
        });
    } else {
        const [user] = await db.all(`SELECT * FROM users WHERE email = ?`, [email]);
        if (user) {
            return res.status(400).send({
                message: 'User Already Exists',
                status: 400
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            await db.run(`INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`, [first_name, last_name, email, hashedPassword]);
            return res.status(200).send({
                message: 'Successfully Registered',
                status: 200,
            })
        }
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
