import { Router } from 'express';
const router = Router();



router.post('/login', (req, res) => {
    console.log(req.body);
    res.send('ok');
})

router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

router.post('/logout', (req, res) => {
    console.log(req.body);
    res.send('ok');
});


export default router;
