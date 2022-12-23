export class UserModel {
    // * IMPORTANT *  these fields must match the same name of the columns in the DB table 
    public user_id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public Pwd: string;
    public matchedPwd: string;
    public user_role: string;
    
    public constructor(user: UserModel) {

        this.user_id = user.user_id;
        this.firstName= user.firstName;
        this.lastName= user.lastName;
        this.username = user.username;
        this.Pwd = user.Pwd;
        this.matchedPwd = user.matchedPwd;
        this.user_role = user.user_role;

    }
}

