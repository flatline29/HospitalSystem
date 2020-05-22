const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan'); // morgan will log to the console stuff related to web traffic auto
const path = require('path'); // pre loaded


const app = express();
const port = process.env.PORT || 3000; // calling PORT from package.json

app.use(morgan('tiny')); // combined gives complete info, tiny gives minimal
app.use(express.static(path.join(__dirname, 'public'))); // tell express to use static files in public folder
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js'))); // if you want, look in these locations too
app.use('/popper', express.static(path.join(__dirname, '/node_modules/pooper.js/dist/umd'))); // path.join will join all the params passed to create the correct path to the file
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs'); // to tell express to look for view engine ejs

const homeRouter = require('./src/routes/homeRouter');

app.use('/home', homeRouter);
app.use('/home/user', homeRouter);

app.get('/', (req, res) => {
  res.render('index',
    {
      nav: [{ link: '/home', title: 'Home' },
        { link: '/services', title: 'Services' },
        { link: '/about', title: 'About' },
        { link: '/contact', title: 'Contact' }],
      title: 'HMS',
    });
});

app.listen(port, () => {
  debug(`We are on port ${chalk.green(port)}`); // this will console to the terminal, chalk adds color to the message
});
