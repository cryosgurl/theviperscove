import app from './app';
import * as cors from 'cors';
import { corsOptions } from './app';

// Port Number
const port = 7000;

// Index Route
app.get('/', cors(corsOptions), (req, res) => {
    res.send({message: ['This is not a valid endpoint!']});
});

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
