const express = require('express');
const app = express();
const cors = require('cors')
const port = 7000;

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/', cors(corsOptions), (req, res, next) => res.json(
    {
        data:
        {
            username: 'Cryos',
            password: 123
        }
    }
));
app.get('/shit', cors(corsOptions), (req, res, next) => res.json(
    {
        hello: 'hi'
    }
));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
