let express = require('express');
let cors = require('cors');
let app = express();
const PORT = 9090;

app.use(cors());

app.get('/inventory/filesrecord.txt', (req, res) => {
    res.sendFile("filesrecord.txt", { root: __dirname });
});

app.use('/inventory', express.static('files'));

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }else {
        console.log("Server is running on port " + PORT);
    }
});