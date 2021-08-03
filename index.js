const express = require('express');
const env = require('./config/environment');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport_google_oauth_strategy');


const MongoStore = require('connect-mongo');


const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");



app.use(express.urlencoded());
app.use(cookieParser());

const path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, '/scss'),
    dest: path.join(__dirname, env.asset_path, '/css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.static(env.asset_path));
//setup viewengine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



if(env.name == 'development'){
    app.use(session ({
        name: 'applebook',
        secret: env.session_cookie_key,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge : (1000 * 60 * 100)
        },
    
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb://localhost/applebook_db'  
            }
        )
    }));
}



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//uses express router
app.use('/', require('./router'));

app.listen(port, function(err){
    if(err){
        console.log('Server is not running');
    }

    console.log('server is running on port : ' + port);
})

