import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import AuthAPI from 'api/auth';

let express = require('express');
let path = require('path');
let app = express();
const port = process.env.PORT || 8080;
const publicPath = express.static(path.join(__dirname, ''));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/', publicPath);

app.use('/api/auth', AuthAPI);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port ' + port);
    }
});
