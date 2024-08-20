export class ServerError extends Error {    
    constructor() {
        super(`The server has encountered an error while processing your request. Try again later.`)
        this.name = 'ServerError'
    }
}