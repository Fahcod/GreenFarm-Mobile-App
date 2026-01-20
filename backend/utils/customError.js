

export class customError extends Error {
    constructor (statusCode,message) {
      super(message);
      this.satusCode =statusCode
    }
}