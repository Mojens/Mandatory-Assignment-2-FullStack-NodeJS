import { Router } from 'express';
const router = Router();

router.post('/api/login', (req, res) => {
    console.log(req.body);
    res.send('ok');
})

router.post('/api/register', (req, res) => {
    console.log(req.body);
    res.send('ok');
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
