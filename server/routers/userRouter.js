import { Router } from 'express';
const router = Router();
import db from '../databases/connection.js';

import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));



router.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    if (!req.session.user || req.session.user.id !== Number(id)) {
        return res.status(401).send({
            message: 'Unauthorized',
            status: 401
        });
    }
    const [user] = await db.all('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
        return res.status(404).send({
            message: 'Unable to get user information',
            status: 404
        });
    } else {
        return res.status(200).send({
            message: 'User information retrieved',
            user: user,
            status: 200
        });
    }
})

router.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    console.log(req.body)
    if (!req.session.user || req.session.user.id !== Number(id)) {
        return res.status(401).send({
            message: 'Unauthorized',
            status: 401
        });
    }
    if (!first_name || !last_name || !email) {
        return res.status(400).send({
            message: 'Please Fill In All Fields',
            status: 400
        });
    }
    await db.run('UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?', [first_name, last_name, email, id]);
    const [user] = await db.all('SELECT * FROM users WHERE id = ?', [id]);
    const { password, token, token_expiration, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword;
    return res.status(200).send({
        message: 'Your information has been updated',
        user: userWithoutPassword,
        status: 200
    });
});

export default router;