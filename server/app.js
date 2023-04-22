import express from 'express';
const app = express();
app.use(express.json());


import loginRouter from './routers/loginRouter.js';
app.use(loginRouter);








const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
})
