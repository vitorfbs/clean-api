import { EmailValidator } from '../validators';
import { badRequest, serverError } from "../helpers/http-helper";
import { InvalidParamError, MissingParamError } from "../errors";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle (httpRequest: HttpRequest): HttpResponse {
        try {
            for (const field of this.requiredFields) {
                if(!httpRequest.body[field]){
                    return badRequest(new MissingParamError(field))
                }
            }

            const { email, password, passwordConfirmation } = httpRequest.body
            
            const isValid: boolean = this.emailValidator.isValid(email)

            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

            if(password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            
            return  {
                statusCode: 200,
                body: "OK"
            }
    
        } catch (e) {
            return serverError()
        }
        
    }
}