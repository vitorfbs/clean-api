import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from "../errors/missing-param-error";

export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse {
        if (typeof httpRequest.body.name === "undefined"){
            return {
                statusCode: 400,
                body: new MissingParamError("name")
            }
        }
        if (typeof httpRequest.body.email === "undefined"){
            return {
                statusCode: 400,
                body: new MissingParamError("email")
            }
        }
        return  {
            statusCode: 200,
            body: "OK"
        };
        
    }
}