export class VacationModel {
    // * IMPORTANT *  these fields must match the same name of the columns in the DB table 
    public id: number;
    public information: string;
    public location: string;
    public image: string;
    public imageName: string;
    public date_from:string | Date = new Date();
    public date_to:string |  Date = new Date();
    public price: number;
    public user_id: number;

    public constructor(vacation: VacationModel) {

        this.id = vacation.id;
        this.information = vacation.information;
        this.location = vacation.location;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.date_from = vacation.date_from;
        this.date_to = vacation.date_to;
        this.price = vacation.price;
        this.user_id = vacation.user_id;
    }
}  


