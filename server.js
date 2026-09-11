const express = require('express');
const app = express();
console.log("ESTOU EXECUTANDO ESTE SERVER.JS");

mongodb = require('./data/database');
//app.get('/alice-test-123', (req, res) => {
//    res.send('ESTE É O MEU SERVIDOR DO VS CODE');
//})

; const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

//app.get('/teste', (req, res) => {
//    res.send('O SERVIDOR ESTÁ FUNCIONANDO!');
//});


mongodb.initDB((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`)
        });
    };

});