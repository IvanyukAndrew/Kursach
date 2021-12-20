const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const badgeRoutes = require('./routes/badge');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create ({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(badgeRoutes);

async function start() {
    try{
        await mongoose.connect(
        'mongodb+srv://Andrei:1q2w3e4r@cluster0.qkdls.mongodb.net/badge', {
            
        })
    } catch (e) {
        console.log(e);
    }
};

start();

app.listen(PORT, () => {
    console.log('Server has been started...');
});

