import * as express from 'express';
import * as cors from 'cors';
import { corsOptions } from '../app';

const userRouter = express.Router();

// Register
userRouter.get('/register', cors(corsOptions), (req, res, next) => {
    res.send(
        {hello: [
            1, 2
        ]}
    );
});

export default userRouter;
