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

router.get('/api/published/posts', async (req, res) => {
    let posts = await db.all('SELECT * FROM posts WHERE is_published = true');
    for (const post of posts) {
        const [user] = await db.all('SELECT first_name, last_name FROM users WHERE id = ?', [post.user_id]);
        const author = user.first_name + ' ' + user.last_name;
        post.author = author;
    }
    if (posts.length === 0) {
        return res.status(404).send({
            message: "Posts Not Found",
            status: 404
        });
    }
    res.json(posts);
});


router.get('/api/published/posts/:id', async (req, res) => {
    const [post] = await db.all('SELECT * FROM posts WHERE id = ? AND is_published = true', [Number(req.params.id)]);
    const [user] = await db.all('SELECT first_name, last_name FROM users WHERE id = ?', [post.user_id]);
    const author = user.first_name + ' ' + user.last_name;
    post.author = author;
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
        for (const post of posts) {
            const [user] = await db.all('SELECT first_name, last_name FROM users WHERE id = ?', [post.user_id]);
            const author = user.first_name + ' ' + user.last_name;
            post.author = author;
        }
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
        const { title, content, is_published } = req.body;
        if (!title || !content || is_published === undefined) {
            return res.status(400).send({
                message: "Please Fill In All Fields",
                status: 400
            });
        } else {
            await db.run('INSERT INTO posts (user_id, title, content, is_published) VALUES (?, ?, ?, ?)', [req.session.user.id, title, content, is_published]);

            return res.status(200).send({
                message: `Post Created <br> Title: ${title}`,
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

    const post = await db.get('SELECT * FROM posts WHERE id = ?', [Number(req.params.id)]);
    if (!post || post.user_id !== req.session.user.id) {
        return res.status(403).send({
            message: "Forbidden",
            status: 403
        });
    }

    await db.run('DELETE FROM posts WHERE id = ?', [Number(req.params.id)]);
    return res.status(200).send({
        message: `Post Deleted <br> Title: ${post.title}`,
        status: 200
    });
});

router.patch('/api/posts/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({
            message: "Unauthorized",
            status: 401
        });
    }

    const post = await db.get('SELECT * FROM posts WHERE id = ?', Number(req.params.id));
    if (!post || post.user_id !== req.session.user.id) {
        return res.status(403).send({
            message: "Forbidden",
            status: 403
        });
    }

    await db.run('UPDATE posts SET is_published = true WHERE id = ?', Number(req.params.id));

    return res.status(200).send({
        message: `Post published <br> Title: ${post.title}`,
        status: 200
    });
});

export default router;