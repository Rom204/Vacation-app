// base ClientError class
export class ClientError { 
    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}
// "Child" ClientError class
export class RouteNotFoundError extends ClientError {
    
    public constructor(route: string) {
        
        super(404, ` route ${route} not found`);
    
    }
}
