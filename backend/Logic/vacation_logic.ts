// All logical operations of the backend folder will displayed here.
// importations 
import dal from "../MySql/dal_mysql"
import { OkPacket } from "mysql";
import { VacationModel } from "../Models/vacation_model";
import {v4 as uuid} from "uuid";
import fs from "fs";
import path from "path"




// functions( async / await ) for getting data from DB
const getAllVacations = async (): Promise<VacationModel> => {
    // command line for the DB
    const sql = `
        SELECT * FROM vacation.vacations
    `;

    // const sql2 =`
    //     SELECT SCHEMA_NAME.TABLE_NAME1.*, SCHEMA_NAME.TABLE_NAME2.field_you want to add AS how_the_field_will_be_displayed
    //     FROM SCHEMA_NAME.TABLE_NAME1 JOIN TABLE_NAME2
    //     ON SCHEMA_NAME.TABLE1.on_wanted_field = TABLE_NAME2.id
    // `;
    // a promise function that connects us to the database with the command line
    const vacation = await dal.execute(sql);
    return vacation;
}

const getSingleVacation = async (id: number): Promise<VacationModel> => {
    // command line for the DB
    const sql = `
        SELECT * FROM vacation.vacations WHERE id = ${id}
    `;
    const vacation = await dal.execute(sql);
    return vacation;
}

const addVacation = async (newVacation: VacationModel, next): Promise<VacationModel> => {
    
    const extension = newVacation.image?.name.split(".")[1]
    const imageName = uuid()+"."+ extension;
    newVacation.image.name = imageName;

    const sql = `
        INSERT INTO vacation.vacations VALUES 
        (DEFAULT,
        '${newVacation.information}',
        '${newVacation.location}',
        '${newVacation.image.name}',
        '${newVacation.date_from}',
        '${newVacation.date_to}',
        '${newVacation.price}')
        `;
    const result :OkPacket = await dal.execute(sql);
    newVacation.image.mv("./uploadPics/"+imageName); 
    
    newVacation.id = result.insertId
    return newVacation;
} 


const updateVacation = async (vacation: VacationModel): Promise<VacationModel> => {
    const sql = `
    UPDATE vacation.vacations 
    SET information = '${vacation.information}'
    WHERE id = ${vacation.id}
    `;
    const response : OkPacket = await dal.execute(sql);
    return vacation;
}

const deleteVacation = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM vacation.vacations WHERE id=${id}
    `;

    let name = await getSingleVacation(id);
    fs.unlink(`./uploadPics/${name[0]["imageName"]}`, (err) => {
        if (err) {
            console.error(err);
        }
    })
    const response = await dal.execute(sql);
    
}

// exporting 
export default {
    getAllVacations,
    getSingleVacation,
    addVacation,
    deleteVacation,
    updateVacation
}


