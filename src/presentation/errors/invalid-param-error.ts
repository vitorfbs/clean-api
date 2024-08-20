export class InvalidParamError extends Error {
    constructor(paramName: string) {
        super(`The ${paramName} provided is invalid`)
    }
}