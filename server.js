'use strict';
import Koa from 'koa'
const app = Koa();

// Webpack
// --------------------------------------------------
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpack from 'webpack'

let config;
if (process.env.NODE_ENV !== 'production') {
    config = require('./webpack.config.dev');
} else {
    config = require('./webpack.config.prod');
}

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath
}));

if (process.env.NODE_ENV !== 'production') {
    app.use(webpackHotMiddleware(compiler));
}

// Serve Static Files
// --------------------------------------------------
import path from 'path'
import serve from 'koa-static'

app.use(serve(path.resolve('client')))


// Error Handling
// --------------------------------------------------
app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});


// Logging
// --------------------------------------------------
import fs from 'fs'
import morgan from 'koa-morgan'

app.use(morgan.middleware('combined'));


// Routing
// --------------------------------------------------
import * as playerAPI from './server/playerAPI'
import router from 'koa-router'

let myRouter = router();

myRouter
    .get('/api/players/:searchTerm', playerAPI.getPlayers)
    .get('/api/player/:id', playerAPI.getPlayer);

app
    .use(myRouter.routes())
    .use(myRouter.allowedMethods());


// Start Server
// --------------------------------------------------
import http from 'http'

const httpServer = http.Server(app.callback());
const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
    console.log('App is listening on port', port);
});
