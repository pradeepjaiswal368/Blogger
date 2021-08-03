const fs = require('fs');
const rfs = require('rotating-file-stream');

const path = require('path');
const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log', {
    interval : '1d',
    path: logDirectory
})

const  development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'qwertyuio' ,
    db : 'thought_development',

    google_client_id : "397295411916-9m0docfgk51idvj052pln46efc1ebplh.apps.googleusercontent.com",
    google_client_secret_key : "eL5Gexk_gCocWpfH6tD3dduM",
    google_callback_url : "http://localhost:8000/users/auth/google/callback"
}


const production = {
    name : 'production',
    asset_path : process.env.THOUGHT_ASSET_PATH,
    session_cookie_key : 'RthdahJtB5wq45gNRw7aNUC58Dpk38hx' ,
    db : 'thought_production',

    google_client_id : process.env.THOUGHT_GOOGLE_CLIENT_ID,
    google_client_secret_key : process.env.THOUGHT_GOOGLE_CLIENT_SECRET_KEY,
    google_callback_url : process.env.THOUGHT_GOOGLE_CALLBACK_URL
}

module.exports = eval(process.env.THOUGHT_ENVIROMENT) == undefined ? development : eval(process.env.THOUGHT_ENVIROMENT);