
class Users {
    public static getAllUsersURL = "/all";
    public static getSingleUserUrl = "/:id";
    public static addUserURL = "/add";
    public static updateUserURL = "/add";
    public static deleteUserURL = "/:id";
    public static checkLogin = "/checkLogin";
}

class Vacations {
    public static getAllVacationsURL = "/all";
    public static getSingleVacation = "/:id";
    public static addVacation = "/add";
    public static updateVacation = "/add";
    public static deleteVacation = "/delete/:id";
}

export {
    Users,
    Vacations,
} ;