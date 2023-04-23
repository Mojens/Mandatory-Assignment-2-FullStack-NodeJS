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
    if (!posts) {
        return res.status(404).send({
            message: "Posts Not Found",
            status: 404
        });
    }
});

router.get('/api/published/posts/:id', async (req, res) => {
    const [post] = await db.all('SELECT * FROM posts WHERE id = ? AND is_published = true', [req.params.id]);
    if (!post) {
        return res.status(404).send({
            message: "Post Not Found",
            status: 404
        });
    }
    res.json(post);
});

router.get('/api/posts', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({
            message: "Unauthorized",
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
            message: "Unauthorized",
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

router.delete('/api/posts/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({
            message: "Unauthorized",
            status: 401
        });
    }

    const post = await db.get('SELECT * FROM posts WHERE id = ?', req.params.id);
    if (!post || post.user_id !== req.session.user.id) {
        return res.status(403).send({
            message: "Forbidden",
            status: 403
        });
    }

    await db.run('DELETE FROM posts WHERE id = ?', req.params.id);

    const updatedPost = await db.all('SELECT * FROM posts WHERE user_id = ?', [req.session.user.id]);
    return res.status(200).send({
        message: "Post Deleted",
        posts: updatedPost,
        status: 200
    });
});


export default router;