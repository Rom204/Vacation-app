export class SomeModel {
    // * IMPORTANT *  these fields must match the same name of the columns in the DB table 
    public id: number;
    public firstName: string;

    public constructor(something: SomeModel) {

        this.id = something.id;
        this.firstName = something.firstName;
        
    }
}

