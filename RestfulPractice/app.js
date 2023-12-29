//imports
import express from 'express';
import pg from 'pg';

// global variables
const app = express();
const { Pool } = pg;
const expressPort = 5001;
const pool = new Pool ({
    user: 'matthewslonoff',
    password: 'slonoff4',
    host: 'localhost',
    database: 'petshopPractice',
    port: 5432,
});

// middleware
app.use(express.json());

// routes
app.get('/pets', (req, res) => {
    pool
    .query('SELECT * FROM pets')
    .then((result) => res.send(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry your pet not found');
    });
});

app.get('/pets/:index', (req, res) => {
    const { index } = req.params;
    pool
    .query('SELECT * FROM pets WHERE id=$1', [index])
    .then((result) => {
        if (result.rows.length > 0) {
            res.status(200).send(result.rows)
        } else {
            res.status(404).send('Pet not found');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry your pet not found');
    });
});

app.post('/pets', (req, res) => {
    let { age, kind, name } = req.body;
    let queryParams = [age, kind, name];
    pool.query('INSERT INTO pets (age, kind, name) VALUES($1, $2, $3)', queryParams)
    .then((result) => res.send('New Pet Added!'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry cannot add new pet now');
    });
});

app.delete('/pets/:index', (req, res) => { // good to go
    const { index } = req.params;
    console.log(req.params);
    pool.query('DELETE FROM pets WHERE id=$1 RETURNING *', [index])
    .then((result) => {
          console.log(result.rows);
        if (result.rows.length === 0) {
            res.status(404).send('Pet not found');
        } else {
            res.status(200).send('Pet deleted!');
           }
        })
       .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry your pet not found');
    });
});





//start server
app.listen(expressPort, () => console.log('Listening at port ', expressPort));