import { UploadedFile } from "express-fileupload";

export class VacationModel {
    // * IMPORTANT *  these fields must match the same name of the columns in the DB table 
    public id: number;
    public information: string;
    public location: string;
    public image: UploadedFile;
    public imageName: string;
    public date_from: Date = new Date();
    public date_to: Date = new Date();
    public price: number;

    public constructor(vacation: VacationModel) {

        this.id = vacation.id;
        this.information = vacation.information;
        this.location = vacation.location;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.date_from = vacation.date_from;
        this.date_to = vacation.date_to;
        this.price = vacation.price;
        
    }
}

