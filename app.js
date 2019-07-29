const express = require('express');
const apps = require('./playstore.js');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const {sort, genre} = req.query;
    let results = apps;

    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app')
        }
        if(sort === 'rating') {
            results.sort((a, b) => b.Rating - a.Rating)
        }
        if(sort === 'app') {
            results.sort((a, b) => a.App.localeCompare(b.App))
        }
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res.status(400).send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
        results = results.filter(app => {
            return app.Genres.includes(genre);
        });
    }

    res.json(results)
});

app.listen(8000, () => {
    console.log('Server on port 8000')
})