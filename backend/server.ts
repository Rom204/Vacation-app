// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/config";
import mysql_create_table from "./MySql/mySql_init";
import user_routers from "./Routes/user_routers";
import vacation_routers from "./Routes/vacation_routers";
import fileUpload from "express-fileupload";


// create server using express
const server = express();

// creating tables inside mysql if not exists
mysql_create_table()

// cross origin platforms
// define what headers should be returned in the response 
const corsOptions = {
    exposedHeaders: "authorization"
}
server.use(cors(corsOptions));

server.use(fileUpload({
    createParentPath:true
}));

// every data transfer is a json data
server.use(express.json());

server.use(express.static('./uploadPics'))

// calling ROUTES 
server.use("/user", user_routers);
server.use("/vacation",vacation_routers);

// calling errors handler 
server.use("*", ErrorHandler);

//TODO: catch all errors file 

// uploading the server with matching port 
const currentPort = config.port;
server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )