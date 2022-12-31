import dal from "./dal_mysql";

const create_users_table =`
    CREATE TABLE IF NOT EXISTS vacation.users_table (
    user_id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NULL,
    lastName VARCHAR(45) NULL,
    username VARCHAR(45) NULL,
    password VARCHAR(200) NULL,
    role VARCHAR(45) NULL DEFAULT 'user',
    PRIMARY KEY (user_id),
    UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE);
`;

const create_vacations_table =`
    CREATE TABLE IF NOT EXISTS vacation.vacations (
    id INT NOT NULL AUTO_INCREMENT,
    information VARCHAR(45) NULL,
    location VARCHAR(45) NULL,
    imageName VARCHAR(300) NULL,
    date_from DATE NULL,
    date_to DATE NULL,
    price DECIMAL(6,2) NULL,
    PRIMARY KEY (id));
`;

const create_vacations_and_users =`
    CREATE TABLE IF NOT EXISTS vacation.vacations_and_users (
    id INT NOT NULL AUTO_INCREMENT,
    vacation_id INT NULL,
    user_id INT(45) NULL,
    vacation_name VARCHAR(45) NULL,
    PRIMARY KEY (id));
`;

const mysql_create_table = () => {
    dal.execute(create_users_table);
    dal.execute(create_vacations_table);   
    dal.execute(create_vacations_and_users);   
}; 

export default mysql_create_table