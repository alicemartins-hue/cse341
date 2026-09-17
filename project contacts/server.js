const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb = require('./data/database');

; const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

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