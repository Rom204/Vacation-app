//DAL -> Data Abstract Layer
//to to install mysql -> npm install mysql

import mysql from "mysql";
import config from "../Utils/config";

const connection = mysql.createPool({
    host: config.mySQLhost,
    user: config.mySQLUser,
    password: config.mySQLPassword,
    database: config.mySQLdb
});

console.log("we are connected to the DB");

const execute = (sql: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => { //to Promisify an asynchronous function
        //execute the sql on mysql server
        connection.query(sql, (err, result) => {
            //if we got an error, exit with reject and return

            if (err) {
                reject(err);
                return;
            }
            //return the result....
            resolve(result);

        })
    });
}

export default { execute }