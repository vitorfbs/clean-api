import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator, AccountModel, AddAccountModel, AddAccount } from './signup-protocols';
import { badRequest, serverError } from "../../helpers/http-helper";
import { InvalidParamError, MissingParamError } from "../../errors";

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    handle (httpRequest: HttpRequest): HttpResponse {
        try {
            for (const field of this.requiredFields) {
                if(!httpRequest.body[field]){
                    return badRequest(new MissingParamError(field))
                }
            }

            const { name, email, password, passwordConfirmation } = httpRequest.body
            
            const isValid: boolean = this.emailValidator.isValid(email)

            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

            if(password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            
            const newAccount = this.addAccount.add({
                name,
                email,
                password
            })

            return  {
                statusCode: 201,
                body: newAccount
            }
    
        } catch (e) {
            return serverError()
        }
        
    }
}