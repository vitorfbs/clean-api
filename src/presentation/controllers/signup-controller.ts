import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";

export class SignUpController {
    requiredFields = ['name', 'email']

    handle (httpRequest: HttpRequest): HttpResponse {
        for (const field of this.requiredFields) {
            if(!httpRequest.body[field]){
                return badRequest(new MissingParamError(field))
            }
        }
        return  {
            statusCode: 200,
            body: "OK"
        };
        
    }
}