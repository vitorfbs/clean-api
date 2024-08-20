import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";

export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse {
        if (typeof httpRequest.body.name === "undefined"){
            return badRequest(new MissingParamError("name"))
        }
        if (typeof httpRequest.body.email === "undefined"){
            return badRequest(new MissingParamError("email"))
        }
        return  {
            statusCode: 200,
            body: "OK"
        };
        
    }
}