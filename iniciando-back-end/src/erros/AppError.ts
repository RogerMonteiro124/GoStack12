class Error{
   public readonly  message: string;
   public readonly statusCoode: number;
    constructor(message: string, statusCode = 400){
        this.message = message;
        this.statusCoode = statusCode;
    }
}

export default Error;