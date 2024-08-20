import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { EmailValidator } from '../validators/email-validator';

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle (httpRequest: HttpRequest): HttpResponse {
        for (const field of this.requiredFields) {
            if(!httpRequest.body[field]){
                return badRequest(new MissingParamError(field))
            }
        }
        const isValid: boolean = this.emailValidator.isValid(httpRequest.body.email)
        if (!isValid) {
            return badRequest(new InvalidParamError('email'))
        }
        return  {
            statusCode: 200,
            body: "OK"
        };
        
    }
}