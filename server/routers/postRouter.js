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

router.get('/api/published/posts', async (req, res) => {
    const posts = await db.all('SELECT * FROM posts WHERE is_published = true');
    res.json(posts);
});

router.get('/api/published/posts/:id', async (req, res) => {
    const [post] = await db.all('SELECT * FROM posts WHERE id = ? AND is_published = true', [req.params.id]);
    res.json(post);
});

router.get('/api/posts', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({
            message: "Not Authorized",
            status: 401
        });
    } else {
        const posts = await db.all('SELECT * FROM posts WHERE user_id = ?', [req.session.user.id]);
        return res.status(200).send({
            message: "Posts Retrieved",
            posts: posts,
            status: 200
        });
    }
});

router.post('/api/posts', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({
            message: "Not Authorized",
            status: 401
        });
    } else {
        const { title, body, is_published } = req.body;
        if (!title || !body || is_published === undefined) {
            return res.status(400).send({
                message: "Please Fill In All Fields",
                status: 400
            });
        } else {
            await db.run('INSERT INTO posts (user_id, title, body, is_published) VALUES (?, ?, ?, ?)', [req.session.user.id, title, body, is_published]);

            const updatedPost = await db.all('SELECT * FROM posts WHERE user_id = ?', [req.session.user.id]);
            return res.status(200).send({
                message: "Post Created",
                posts: updatedPost,
                status: 200
            });
        }
    }
});

router.put('/api/posts/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({
            message: "Not Authorized",
            status: 401
        });
    } else {
        const { title, body, is_published } = req.body;
        if (!title || !body || is_published === undefined) {
            return res.status(400).send({
                message: "Please Fill In All Fields",
                status: 400
            });
        } else {
            await db.run('UPDATE posts SET title = ?, body = ?, is_published = ? WHERE id = ?', [title, body, is_published, req.params.id]);

            const updatedPost = await db.all('SELECT * FROM posts WHERE user_id = ?', [req.session.user.id]);
            return res.status(200).send({
                message: "Post Updated",
                posts: updatedPost,
                status: 200
            });
        }
    }
});

export default router;