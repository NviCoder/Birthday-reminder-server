
const express = require("express"); 

const path = require("path");
const http = require("http");
const cors = require("cors");
const cookieParser = require('cookie-parser')


const dbConnect = require("./db/mongoConnect");
const {routesInit} = require("./routes/config_route");

const app = express();

app.use(
    cors({ 
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-api-key', 'Authorization'],
        origin:"http://localhost:3000",
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        credentials:true,
        preflightContinue: false
    })
)
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);

let port = process.env.PORT || "3001";

server.listen(port);