import { Router } from 'express';
const router = Router();

router.post('/api/login', (req, res) => {
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
})

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
