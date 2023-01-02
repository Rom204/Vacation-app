// All logical operations of the backend folder will displayed here.
// importations 
import dal from "../MySql/dal_mysql"
import { OkPacket } from "mysql";
import { UserModel } from "../Models/user_model";
import jwt from "jsonwebtoken";
import { read } from "fs";
import { getData } from "../prisma";
const bcrypt = require("bcrypt");
require("dotenv").config();
// const prisma = new PrismaClient();


// functions( async / await ) for getting data from DB
const getAllUsers = async (): Promise<UserModel> => {
    const sql = `
        SELECT * FROM vacation.users
    `;
    const user = await dal.execute(sql);
    return user;
}


const checkValidUsername = async (user: UserModel): Promise<Boolean> => {
    const sql = `
    SELECT username FROM vacation.users WHERE username = '${user.username}'
    `;
    const response = await dal.execute(sql);

    if (response.length > 0) {
        console.log(response + " invalid!");
        return false;
    }
    console.log(response + " OK!");
    return true;
};

const getSingleUser = async (id: number): Promise<UserModel> => {
    // command line for the DB
    const sql = `
        SELECT * FROM vacation.users WHERE id = ${id}
    `;
    const user = await dal.execute(sql);
    return user;
}

const checkLogin = async (user: UserModel) => {

    const sql = `
        SELECT user_id,username, password,role FROM vacation.users_table WHERE username = '${user.username}'
    `;
    const usernameExists = await dal.execute(sql);

    if (usernameExists.length > 0) {
        const user_id = usernameExists[0]["user_id"];
        const username = usernameExists[0]["username"];
        const match = await bcrypt.compare(user.password, usernameExists[0]["password"]);
        const user_role = usernameExists[0]["role"];

        if (match) {
            return ({
                user_id,
                username,
                user_role,
            })
        }
    } else {
        throw new Error('invalid username or password provided');
    }
}


const addNewUser = async (user: UserModel) => {
    // in mysql username has a unique key 
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const sql = `
    INSERT INTO vacation.users_table VALUES
    (DEFAULT,
    '${user.firstName}',
    '${user.lastName}',
    '${user.username}',
    '${hashedPassword}',
    'user')
    `;
    const response: OkPacket = await dal.execute(sql);
    user.user_id = response.insertId;
}
const addUser = async (user: UserModel) => {
    // in mysql username has a unique key 
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    // const sql = `
    // INSERT INTO vacation.users_table VALUES
    // (DEFAULT,
    // '${user.firstName}',
    // '${user.lastName}',
    // '${user.username}',
    // '${hashedPassword}',
    // 'user')
    // `;
    // const response: OkPacket = await  ;
    // user.user_id = response.insertId;
}


const updateUser = async (user: UserModel): Promise<UserModel> => {
    const sql = `
    UPDATE vacation.users 
    SET firstName = '${user.username}'
    WHERE id = ${user.user_id}
    `;
    const response: OkPacket = await dal.execute(sql);
    return user;
}

const deleteUser = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM vacation.users WHERE id=${id}
    `;
    const response = await dal.execute(sql);
}

const allVacationsUser = async (vacationID: number, user_id: number, vacation_name: string) => {
    const sql = `
        INSERT INTO vacation.vacations_and_users VALUES
        (DEFAULT,
        ${vacationID},
        ${user_id},
        '${vacation_name}')
    `;
    const result = await dal.execute(sql);
    return result;
}

const allVacationsUserDelete = async (vacationID: number, user_id: number) => {
    const sql = `
        DELETE FROM vacation.vacations_and_users WHERE vacation_id=${vacationID} AND user_id='${user_id}'
    `;
    const result = await dal.execute(sql);
    return result;
};

const vacationsID = async (userID: number) => {
    const sql = `
        SELECT vacation.vacations.*, vacation.user_vacations.user_id
        FROM(SELECT * FROM vacation.vacations_and_users WHERE user_id=${userID}) AS user_vacations
        RIGHT JOIN vacation.vacations ON vacation.vacations.id = user_vacations.vacation_id
        ORDER BY date_from
        `;
    const result = await dal.execute(sql);
    // const result = await getData();
    return result;
}

type MyToken = {
    id: number
    username: string
    role: string
    iat: number
    exp: number
}
const checkToken = (auth: string) => {
    const token = auth.split(" ")[1];
    if (token) {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as MyToken;
        return verified;
    }
}

// exporting 
export default {
    getAllUsers,
    getSingleUser,
    addNewUser,
    updateUser,
    deleteUser,
    checkValidUsername,
    checkLogin,
    allVacationsUser,
    allVacationsUserDelete,
    vacationsID,
    checkToken
}